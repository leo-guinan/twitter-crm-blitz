import { Queue } from "quirrel/next"
import db, { RelationshipType, ProcessingStatus } from "db"
import Twitter from "twitter-lite"
import twitterFollowers from "./twitter-followers"
import { add } from "date-fns"
import twitterLikes from "./twitter-likes"
import twitterRetweets from "./twitter-retweets"
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
      "tweet.fields": "public_metrics,entities",
      "user.fields": "entities",
    }
    client
      .get("tweets/search/recent", params)
      .then(async (results) => {
        console.log(JSON.stringify(results))
        results.data.map(async (tweet) => {
          console.log(JSON.stringify(tweet))
          //add tweet to collection of tweets, by user, group,
        })
      })
      .catch((e) => {
        console.error(e)
      })
  },
  { exclusive: true }
)
