import { Queue } from "quirrel/next"
import Twitter from "twitter-lite"
import db from "../../../db"
import { getEngagement } from "../../util/twitter/engagement"

export default Queue(
  "api/queues/process-twitter-account",
  async ({ twitterAccountTwitterId }) => {
    const authenticatedUser = await db.twitterAccount.findFirst({
      where: {
        twitterId: twitterAccountTwitterId,
      },
    })
    if (!authenticatedUser) {
      throw new Error("Twitter account not found")
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
    await getEngagement(client, authenticatedUser.twitterId)
  },
  {
    exclusive: true,
  }
)
