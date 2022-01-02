import { CronJob } from "quirrel/next"
import db, { SubscriptionCadence } from "db"
import emailCollection from "./email-collection"

export default CronJob(
  "api/queues/send-daily-subscription", // 👈 the route that it's reachable on
  "0 1 * * *", // every day at 1am
  async () => {
    const subscriptions = await db.subscription.findMany({
      where: {
        cadence: SubscriptionCadence.DAILY,
      },
      select: {
        id: true,
        twitterAccounts: {
          select: {
            twitterAccount: true,
          },
        },
      },
    })

    for (const subscription of subscriptions) {
      const collectedTweets: any[] = []

      for (const twitterAccount of subscription.twitterAccounts) {
        const latestTweets = await db.tweet.findMany({
          where: {
            authorAccountId: twitterAccount.twitterAccount.id,
            tweetCreatedAt: {
              gt: new Date(Date.now() - 1000 * 60 * 60 * 24),
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
              name: `Daily Collection for subscription: ${subscription.id}`,
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
  }
)

//step 1: get collection of tweets for the week
//step 2: add collection to subscription
//step 3: create body of email
//step 4: queue up email to send
