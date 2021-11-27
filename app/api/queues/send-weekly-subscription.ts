import { CronJob } from "quirrel/next"
import db, { SubscriptionCadence, Tweet } from "db"
import emailCollection from "./email-collection"
import Twitter from "twitter-lite"

export default CronJob(
  "api/queues/send-weekly-subscription", // 👈 the route that it's reachable on
  "0 0 * * 0", // every week, sunday midnight
  async () => {
    const subscriptions = await db.subscription.findMany({
      where: {
        cadence: SubscriptionCadence.WEEKLY,
      },
      include: {
        twitterUsers: true,
      },
    })
    const client = new Twitter({
      subdomain: "api", // "api" is the default (change for other subdomains)
      version: "2", // version "1.1" is the default (change for other subdomains)
      extension: false,
      consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
      bearer_token: process.env.TWITTER_BEARER_TOKEN as string,
    })

    for (const subscription of subscriptions) {
      const twitterUserSubscribedTo = subscription.twitterUsers[0]
      console.log(JSON.stringify(twitterUserSubscribedTo))
      if (twitterUserSubscribedTo) {
        const params = {
          query: `from:${twitterUserSubscribedTo.twitterId}`,
          max_results: 100,
          "tweet.fields": "public_metrics,entities,created_at",
          "user.fields": "entities,profile_image_url,name,description",
        }
        let tweetDBObjects: Tweet[] = []

        await client
          .get("tweets/search/recent", params)
          .then(async (results) => {
            for (const tweet of results.data) {
              let savedTweet = await db.tweet.upsert({
                where: {
                  tweetId: tweet.id,
                },
                create: {
                  tweetId: tweet.id,
                  message: tweet.text,
                  tweetCreatedAt: tweet.created_at,
                  author: {
                    connect: {
                      twitterId: twitterUserSubscribedTo.twitterId,
                    },
                  },
                },
                update: {},
              })
              tweetDBObjects.push(savedTweet)
            }
            const collectedTweets = tweetDBObjects.map((dbo) => {
              return {
                tweetId: dbo.tweetId,
              }
            })
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
          })
          .catch((e) => {
            console.error(e)
          })
      }
    }

    //step 1: get collection of tweets for the week
    //step 2: add collection to subscription
    //step 3: create body of email
    //step 4: queue up email to send
  }
)
