import { Queue } from "quirrel/next"
import Twitter from "twitter-lite"
import { formatISO, subDays } from "date-fns"
import emailCollection from "./email-collection"
import db, { SubscriptionCadence, Tweet } from "db"

export default Queue(
  "api/queues/twitter-build-collection", // 👈 the route it's reachable on
  async (job: { subscriptionId }) => {
    const subscription = await db.subscription.findFirst({
      where: {
        id: job.subscriptionId,
      },
      select: {
        cadence: true,
        twitterAccounts: {
          select: {
            twitterAccount: true,
          },
        },
      },
    })
    if (subscription) {
      const twitterAccountQueryString = `(${subscription.twitterAccounts
        .map((twitterUser) => "from:" + twitterUser.twitterAccount.twitterUsername)
        .join(" OR ")}) -is:reply -is:retweet -is:quote`
      console.log(twitterAccountQueryString)
      const client = new Twitter({
        subdomain: "api", // "api" is the default (change for other subdomains)
        version: "2", // version "1.1" is the default (change for other subdomains)
        extension: false,
        consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
        bearer_token: process.env.TWITTER_BEARER_TOKEN as string,
      })

      const startTime =
        subscription.cadence === SubscriptionCadence.WEEKLY
          ? subDays(new Date(), 7)
          : subscription.cadence === SubscriptionCadence.DAILY
          ? subDays(new Date(), 1)
          : ""
      console.log(startTime)
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
                subscription: {
                  connect: {
                    id: job.subscriptionId,
                  },
                },
                tweets: {
                  connect: [...collectedTweets],
                },
              },
            })
            await emailCollection.enqueue({
              subscriptionId: job.subscriptionId,
              collectionId: twitterCollection.id,
            })
          } else {
            console.log("No tweets found. Skipping.")
          }
        })
        .catch((e) => {
          console.error(e)
        })
    }
  },
  { exclusive: true }
)
