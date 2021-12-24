import { Queue } from "quirrel/next"
import Twitter from "twitter-lite"
import twitterLikes from "./twitter-likes"
import twitterRetweets from "./twitter-retweets"
import db from "db"

export default Queue(
  "api/queues/twitter-engagement", // 👈 the route it's reachable on
  async (job: { twitterAccountTwitterId }) => {
    let client
    const authenticatedUser = await db.twitterAccount.findFirst({
      where: {
        twitterId: job.twitterAccountTwitterId,
      },
    })
    if (authenticatedUser && authenticatedUser.twitterToken) {
      client = new Twitter({
        subdomain: "api", // "api" is the default (change for other subdomains)
        version: "2", // version "1.1" is the default (change for other subdomains)
        extension: false,
        consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
        access_token_key: authenticatedUser.twitterToken as string, // from your User (oauth_token)
        access_token_secret: authenticatedUser.twitterSecretToken as string, // from your User (oauth_token_secret)
      })
    } else {
      client = new Twitter({
        subdomain: "api", // "api" is the default (change for other subdomains)
        version: "2", // version "1.1" is the default (change for other subdomains)
        extension: false,
        consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
        bearer_token: process.env.TWITTER_BEARER_TOKEN as string,
      })
    }
    const params = {
      query: `from:${job.twitterAccountTwitterId}`,
      max_results: 75,
      "tweet.fields": "public_metrics,entities,created_at,author_id",
      "user.fields": "entities",
    }
    client
      .get("tweets/search/recent", params)
      .then(async (results) => {
        console.log(JSON.stringify(results))
        results.data.map(async (tweet) => {
          const savedTweet = await db.tweet.upsert({
            where: {
              tweetId: tweet.id,
            },
            create: {
              tweetId: tweet.id,
              message: tweet.text,
              tweetCreatedAt: tweet.created_at,
              authorAccount: {
                connectOrCreate: {
                  where: {
                    twitterId: tweet.author_id,
                  },
                  create: {
                    twitterId: tweet.author_id,
                  },
                },
              },
            },
            update: {
              authorAccount: {
                connectOrCreate: {
                  where: {
                    twitterId: tweet.author_id,
                  },
                  create: {
                    twitterId: tweet.author_id,
                  },
                },
              },
            },
          })
          const public_metrics = tweet.public_metrics
          if (public_metrics.like_count > 0) {
            //send tweet id to queue - look up liking users
            await twitterLikes.enqueue({
              tweetId: tweet.id,
              twitterAccountTwitterId: job.twitterAccountTwitterId,
            })
          }
          if (public_metrics.retweet_count > 0) {
            await twitterRetweets.enqueue({
              tweetId: tweet.id,
              twitterAccountTwitterId: job.twitterAccountTwitterId,
            })
          }
          if (public_metrics.quote_count > 0) {
          }
          if (public_metrics.reply_count > 0) {
          }

          if (tweet.entities) {
            const mentions = tweet.entities.mentions
            if (mentions) {
              for (const mention in tweet.entities.mentions) {
                console.log(JSON.stringify(mentions[mention]))
              }
            }
          }
          const text = tweet.text
        })
      })
      .catch((e) => {
        if ("errors" in e) {
          // Twitter API error
          if (e.errors[0].code === 88) {
            // rate limit exceeded
            console.log(
              "Rate limit will reset on",
              new Date(e._headers.get("x-rate-limit-reset") * 1000)
            )
          } else {
            console.error(e)
          }
        } else {
          console.error(e)
        }
      })
  },
  {
    retry: ["5min", "10min", "20min"],
  }
)
