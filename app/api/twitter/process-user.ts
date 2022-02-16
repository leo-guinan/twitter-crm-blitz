import Twitter from "twitter-lite"
import db, { Tweet } from "../../../db"
import { formatISO, subDays } from "date-fns"
import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import { getEngagement } from "../../util/twitter/engagement"
import { refreshUser, refreshUserByInternalId } from "../../util/twitter/populate-user"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)
  const userId = session.userId
  const orgId = session.orgId

  if (req.body) {
    const { twitterAccountId } = JSON.parse(req.body)

    const client = new Twitter({
      subdomain: "api", // "api" is the default (change for other subdomains)
      version: "2", // version "1.1" is the default (change for other subdomains)
      extension: false,
      consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
      bearer_token: process.env.TWITTER_BEARER_TOKEN as string,
    })

    const account = await refreshUserByInternalId(client, twitterAccountId)
    if (!account) {
      res.statusCode = 404
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify({ message: "No twitter accounts found" }))
    }

    await getEngagement(client, account.twitterId)

    //get most engaged twitter accounts
    const latestTweets = await db.tweet.findMany({
      where: {
        authorAccountId: twitterAccountId,
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
        const stats = {}
        for (const like of tweet.likes) {
          if (!twitterAccounts[like.id]) {
            twitterAccounts[like.id] = like
          }
          //save like to twitter account key
          if (!stats[like.id]) {
            stats[like.id] = {
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

    const stats: undefined | { [key: string]: { likes: number; retweets: number } } = calced
      ?.filter((item) => !!item && item)
      ?.reduce(
        (
          acc: { [key: string]: { likes: number; retweets: number } },
          cur: { [key: string]: { likes: number; retweets: number } }
        ) => {
          if (!acc) {
            return cur
          }

          for (const [key, value] of Object.entries(cur)) {
            if (!acc[key]) {
              acc[key] = { likes: value.likes, retweets: value.retweets }
            } else {
              acc[key]!.likes += value.likes
              acc[key]!.retweets += value.retweets
            }
          }
          return acc
        },
        {}
      )
    if (stats) {
      const totals = Object.entries(stats)
        .map(([key, value]) => {
          return {
            id: key,
            likes: value.likes,
            retweets: value.retweets,
          }
        })
        .sort(
          (
            a: { id: string; likes: number; retweets: number },
            b: { id: string; likes: number; retweets: number }
          ) => {
            if (a.likes + a.retweets > b.likes + b.retweets) {
              return -1
            }
            if (a.likes + a.retweets < b.likes + b.retweets) {
              return 1
            }
            return 0
          }
        )

      const entries = totals.filter((item) => item.id !== `${twitterAccountId}`).slice(0, 10)
      const twitterAccountIds = entries.map(
        (value: { id: string; likes: number; retweets: number }) => {
          return twitterAccounts[value.id]
        }
      )

      if (!twitterAccountIds) {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({ message: "No twitter accounts found" }))
      }

      const twitterAccountUsernames = await db.twitterAccount.findMany({
        where: {
          id: {
            in: twitterAccountIds.map((value) => value.id),
          },
        },
        select: {
          twitterUsername: true,
        },
      })

      const twitterAccountQueryString = `(${twitterAccountUsernames
        .map((twitterAccount) => "from:" + twitterAccount.twitterUsername)
        .join(" OR ")}) -is:reply -is:retweet -is:quote`
      console.log(twitterAccountQueryString)

      const startTime = subDays(new Date(), 7)

      const params = startTime
        ? {
            query: twitterAccountQueryString,
            max_results: 100,
            "tweet.fields": "public_metrics,entities,created_at,author_id",
            "user.fields": "entities,profile_image_url,name,description",
            start_time: formatISO(startTime),
          }
        : {
            query: twitterAccountQueryString,
            max_results: 100,
            "tweet.fields": "public_metrics,entities,created_at,author_id",
            "user.fields": "entities,profile_image_url,name,description",
          }
      let tweetDBObjects: Tweet[] = []

      await client
        .get("tweets/search/recent", params)
        .then(async (results) => {
          if (results.data) {
            for (const tweet of results.data) {
              let savedTweet = await db.tweet.upsert({
                where: {
                  tweetId: tweet.id,
                },
                create: {
                  tweetId: tweet.id,
                  message: tweet.text,
                  tweetCreatedAt: tweet.created_at,
                  authorAccount: {
                    connect: {
                      twitterId: tweet.author_id,
                    },
                  },
                },
                update: {
                  authorAccount: {
                    connect: {
                      twitterId: tweet.author_id,
                    },
                  },
                },
              })
              tweetDBObjects.push(savedTweet)
            }
            const collectedTweets = tweetDBObjects.map((dbo) => {
              return {
                tweetId: dbo.tweetId,
              }
            })
            const twitterCollection = await db.tweetCollection.create({
              data: {
                tweets: {
                  connect: [...collectedTweets],
                },
              },
            })
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ ...twitterCollection }))
          } else {
            console.log("No tweets found. Skipping.")
          }
        })
        .catch((e) => {
          console.error(e)
        })
    }
  }
}

export default handler
