import { Queue } from "quirrel/next"
import Twitter from "twitter-lite"

import db, { SubscriptionCadence, Tweet } from "db"
import emailCollection from "./email-collection"

export default Queue(
  "api/queues/twitter-subscribe-to-user", // 👈 the route it's reachable on
  async (job: { twitterAccountId; twitterUserToSubscribeTo; organizationId }) => {
    const client = new Twitter({
      subdomain: "api", // "api" is the default (change for other subdomains)
      version: "2", // version "1.1" is the default (change for other subdomains)
      extension: false,
      consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
      bearer_token: process.env.TWITTER_BEARER_TOKEN as string,
    })

    const params = {
      query: `(from:${job.twitterUserToSubscribeTo}) -is:reply -is:retweet -is:quote`,
      max_results: 100,
      "tweet.fields": "public_metrics,entities,created_at",
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
                author: {
                  connect: {
                    twitterId: job.twitterUserToSubscribeTo,
                  },
                },
              },
              update: {
                author: {
                  connect: {
                    twitterId: job.twitterUserToSubscribeTo,
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
          const tweetCollection = await db.tweetCollection.create({
            data: {
              subscription: {
                create: {
                  cadence: SubscriptionCadence.WEEKLY,
                  owner: {
                    connect: {
                      id: job.organizationId,
                    },
                  },
                  twitterUsers: {
                    connect: {
                      twitterId: job.twitterUserToSubscribeTo,
                    },
                  },
                },
              },
              tweets: {
                connect: [...collectedTweets],
              },
            },
            select: {
              id: true,
              subscription: true,
            },
          })
          console.log(JSON.stringify(tweetCollection))
          await emailCollection.enqueue({
            subscriptionId: tweetCollection.subscription.id,
            collectionId: tweetCollection.id,
          })
        } else {
          console.error("No results found. Can't make collection.")
        }
      })
      .catch((e) => {
        console.error(e)
      })
  },
  { exclusive: true }
)
