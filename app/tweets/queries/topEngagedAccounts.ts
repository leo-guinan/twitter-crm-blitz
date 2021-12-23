import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const TopEngagedAccounts = z.object({
  // This accepts type of undefined, but is required at runtime
})

export default resolver.pipe(
  resolver.zod(TopEngagedAccounts),
  resolver.authorize(),
  async ({}, ctx) => {
    const orgId = ctx.session.orgId

    const twitterAccount = await db.twitterAccount.findFirst({
      where: {
        organizationId: orgId,
      },
    })

    if (!twitterAccount) {
      throw new NotFoundError(`No Twitter Account found for organization ${orgId}`)
    }

    const latestTweets = await db.tweet.findMany({
      where: {
        authorAccountId: twitterAccount.id,
        tweetCreatedAt: {
          gt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        },
      },
      select: {
        likes: true,
        retweets: true,
      },
    })
    const twitterAccounts = {}
    const calced = latestTweets.map((tweet) => {
      if (tweet.likes.length === 0 && tweet.retweets.length === 0) {
        //pass
      } else {
        console.log(JSON.stringify(tweet))
        const stats = {}
        for (const like of tweet.likes) {
          if (!twitterAccounts[like.id]) {
            twitterAccounts[like.id] = like
          }
          //save like to twitter account key
          console.log(JSON.stringify(like))
          if (!stats[like.id]) {
            stats[like.id] = {
              id: like.id,
              likes: 1,
              retweets: 0,
            }
          } else {
            stats[like.id].likes += 1
          }
        }
        for (const retweet of tweet.retweets) {
          if (!twitterAccounts[retweet.id]) {
            twitterAccounts[retweet.id] = retweet
          }
          //save retweet to twitter account key
          if (!stats[retweet.id]) {
            stats[retweet.id] = {
              id: retweet.id,
              likes: 0,
              retweets: 1,
            }
          } else {
            stats[retweet.id].retweets += 1
          }
        }
        return stats
      }
    })

    console.log(JSON.stringify(calced))

    const stats = calced
      .filter((item) => !!item)
      .reduce((acc, cur) => {
        if (!acc) {
          return cur
        }

        for (const [key, value] of Object.entries(cur)) {
          console.log(key)
          console.log(JSON.stringify(value))
          if (!acc[key]) {
            acc[key] = value
          } else {
            acc[key].likes += value.likes
            acc[key].retweets += value.retweets
          }
        }
        return acc
      }, {})
    console.log(JSON.stringify(Object.values(stats)))
    const totals = Object.values(stats).sort(
      (a: { likes: number; retweets: number }, b: { likes: number; retweets: number }) => {
        if (a.likes + a.retweets > b.likes + b.retweets) {
          return -1
        }
        if (a.likes + a.retweets < b.likes + b.retweets) {
          return 1
        }
        return 0
      }
    )

    const entries = Object.entries(totals.slice(0, 10))
    return entries.map(([key, value]) => {
      console.log(key)
      console.log(JSON.stringify(value))
      return twitterAccounts[value.id]
    })
  }
)
