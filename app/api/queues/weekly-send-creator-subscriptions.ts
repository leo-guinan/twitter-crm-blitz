import { CronJob } from "quirrel/next"
import db from "db"
import emailCollection from "./email-collection"
import { emailTwitterCollection } from "../../util/email/twitter-collection"

export default CronJob(
  "api/queues/weekly-send-creator-subscriptions", // 👈 the route that it's reachable on
  "0 0 * * 0", // every week, sunday midnight
  async () => {
    const twitterAccountsWithSlugs = await db.twitterAccount.findMany({
      where: {
        slug: {
          not: null,
        },
        offSiteSubscribers: {
          some: {
            verified: true,
          },
        },
      },
      select: {
        id: true,
        twitterName: true,
        offSiteSubscribers: true,
      },
    })

    for (const twitterAccount of twitterAccountsWithSlugs) {
      const collectedTweets: any[] = []
      const latestTweets = await db.tweet.findMany({
        where: {
          authorAccountId: twitterAccount.id,
          tweetCreatedAt: {
            gt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
          },
        },
        select: {
          tweetId: true,
          likes: true,
          retweets: true,
        },
      })

      collectedTweets.push(
        ...latestTweets.map((dbo) => {
          return {
            tweetId: dbo.tweetId,
          }
        })
      )

      if (collectedTweets.length > 0) {
        const newCollection = await db.tweetCollection.create({
          data: {
            tweets: {
              connect: [...collectedTweets],
            },
          },
        })
        for (const subscriber of twitterAccount.offSiteSubscribers) {
          await emailTwitterCollection(
            newCollection.id,
            subscriber.email,
            `Latest tweets from ${twitterAccount.twitterName}`
          )
        }
      }
    }
  }
)
