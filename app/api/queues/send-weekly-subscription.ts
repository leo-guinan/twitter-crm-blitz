import { CronJob } from "quirrel/next"
import db, { SubscriptionCadence } from "db"
import emailCollection from "./email-collection"

export default CronJob(
  "api/queues/send-weekly-subscription", // 👈 the route that it's reachable on
  "0 0 * * 0", // every week, sunday midnight
  async () => {
    const subscriptions = await db.subscription.findMany({
      where: {
        cadence: SubscriptionCadence.WEEKLY,
      },
      include: {
        twitterAccounts: {
          include: {
            twitterAccount: true,
          },
        },
      },
    })

    const collectedTweets: any[] = []

    for (const subscription of subscriptions) {
      for (const twitterAccount of subscription.twitterAccounts) {
        const latestTweets = await db.tweet.findMany({
          where: {
            authorAccountId: twitterAccount.twitterAccount.id,
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
      }
      if (collectedTweets.length > 0) {
        const newCollection = await db.tweetCollection.create({
          data: {
            subscription: {
              connect: {
                id: subscription.id,
              },
            },
            tweets: {
              connect: [...collectedTweets],
            },
          },
        })
        await emailCollection.enqueue({
          subscriptionId: subscription.id,
          collectionId: newCollection.id,
        })
      }
    }
  }
)
