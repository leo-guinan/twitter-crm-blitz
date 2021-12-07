import { Queue } from "quirrel/next"
import Twitter from "twitter-lite"

export default Queue(
  "api/queues/twitter-engagement", // 👈 the route it's reachable on
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
      "tweet.fields": "public_metrics,entities",
      "user.fields": "entities",
    }
    client
      .get("tweets/search/recent", params)
      .then(async (results) => {
        console.log(JSON.stringify(results))
        results.data.map(async (tweet) => {
          const public_metrics = tweet.public_metrics
          if (public_metrics.like_count > 0) {
            //send tweet id to queue - look up liking users
          }
          if (public_metrics.retweet_count > 0) {
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
        console.error(e)
      })
  },
  { exclusive: true }
)
