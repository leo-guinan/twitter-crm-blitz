import { Queue } from "quirrel/next"
import db from "../../../db"
import Twitter from "twitter-lite"
import { getRetweets } from "../../util/twitter/retweets"

export default Queue("api/queues/rerun-retweet", async ({ twitterId, tweetId }) => {
  const authenticatedUser = await db.twitterAccount.findFirst({
    where: {
      twitterId,
    },
  })
  if (!authenticatedUser) {
    throw new Error("No authenticated user found")
  }
  let client

  if (!authenticatedUser.twitterToken) {
    client = new Twitter({
      subdomain: "api", // "api" is the default (change for other subdomains)
      version: "2", // version "1.1" is the default (change for other subdomains)
      extension: false,
      consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
      bearer_token: process.env.TWITTER_BEARER_TOKEN as string,
    })
  } else {
    client = new Twitter({
      subdomain: "api", // "api" is the default (change for other subdomains)
      version: "2", // version "1.1" is the default (change for other subdomains)
      extension: false,
      consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
      access_token_key: authenticatedUser.twitterToken as string, // from your User (oauth_token)
      access_token_secret: authenticatedUser.twitterSecretToken as string, // from your User (oauth_token_secret)
    })
  }

  await getRetweets(client, twitterId, tweetId)
})
