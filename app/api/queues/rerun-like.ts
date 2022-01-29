import { Queue } from "quirrel/next"
import { getLikes } from "../../util/twitter/likes"
import Twitter from "twitter-lite"
import db from "../../../db"

export default Queue("api/queues/rerun-like", async ({ twitterId, tweetId }) => {
  const authenticatedUser = await db.twitterAccount.findFirst({
    where: {
      twitterId,
    },
  })
  if (!authenticatedUser) {
    throw new Error("No authenticated user found")
  }
  const client = new Twitter({
    subdomain: "api", // "api" is the default (change for other subdomains)
    version: "2", // version "1.1" is the default (change for other subdomains)
    extension: false,
    consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
    access_token_key: authenticatedUser.twitterToken as string, // from your User (oauth_token)
    access_token_secret: authenticatedUser.twitterSecretToken as string, // from your User (oauth_token_secret)
  })

  await getLikes(client, twitterId, tweetId)
})
