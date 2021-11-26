import { Queue } from "quirrel/next"
import Twitter from "twitter-lite"

import db, { Tweet } from "db"

export default Queue(
  "api/queues/twitter-weekly-digest", // 👈 the route it's reachable on
  async (job: { twitterAccountId }) => {
    const client = new Twitter({
      subdomain: "api", // "api" is the default (change for other subdomains)
      version: "2", // version "1.1" is the default (change for other subdomains)
      extension: false,
      consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
      bearer_token: process.env.TWITTER_BEARER_TOKEN as string,
    })

    const params = {
      query: `from:${job.twitterAccountId}`,
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
                connectOrCreate: {
                  where: {
                    twitterId: job.twitterAccountId,
                  },
                  create: {
                    twitterId: job.twitterAccountId,
                    name: "",
                    bio: "",
                    profilePictureUrl: "",
                  },
                },
              },
            },
            update: {},
          })
          tweetDBObjects.push(savedTweet)
        }
        const collectedTweets = tweetDBObjects.map((dbo) => {
          console.log(JSON.stringify(dbo))
          return {
            tweetId: dbo.tweetId,
          }
        })
        console.log(collectedTweets[0])
        await db.tweetCollection.create({
          data: {
            subscription: {
              connect: 1,
            },
            tweets: {
              connect: [...collectedTweets],
            },
          },
        })
      })
      .catch((e) => {
        console.error(e)
      })
  },
  { exclusive: true }
)
