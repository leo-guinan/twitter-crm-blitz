import { CronJob } from "quirrel/next"
import db, { SubscriptionCadence } from "../../../db"
import emailOffsiteSubscriber from "./email-offsite-subscription"

export default CronJob(
  "api/queues/send-offsite-subscriptions", // 👈 the route that it's reachable on
  "0 0 * * 0", // every week, sunday midnight
  async () => {
    const offsiteSubscriptions = await db.offSiteSubscriber.findMany({
      where: {
        verified: true,
      },
    })

    console.log(offsiteSubscriptions)

    for (const subscription of offsiteSubscriptions) {
      const collectedTweets: any[] = []
      const twitterAccounts = await db.twitterAccount.findMany({
        where: {
          offSiteSubscribers: {
            some: {
              id: subscription.id,
            },
          },
        },
      })
      console.log(twitterAccounts)
      for (const twitterAccount of twitterAccounts) {
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
      }
      if (collectedTweets.length > 0) {
        const newCollection = await db.tweetCollection.create({
          data: {
            tweets: {
              connect: [...collectedTweets],
            },
          },
        })
        await emailOffsiteSubscriber.enqueue({
          offsiteSubscriberId: subscription.id,
          collectionId: newCollection.id,
        })
      }
    }
  }
)
