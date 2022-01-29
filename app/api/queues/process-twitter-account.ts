import { Queue } from "quirrel/next"
import Twitter from "twitter-lite"
import db from "../../../db"
import { getEngagement } from "../../util/twitter/engagement"

export default Queue(
  "api/queues/process-twitter-account",
  async ({ twitterAccountTwitterId }) => {
    //Step 1: Make sure the twitter account is up to date
    //Step 2: Get the latest tweets
    //Step 5: Get the latest likes
    //Step 6: Get the latest retweets
    //Step 7: Get the latest comments
    //Step 8: Build Email
    //Step 9: Send Email

    console.log("Processing Twitter Account", twitterAccountTwitterId)

    const authenticatedUser = await db.twitterAccount.findFirst({
      where: {
        twitterId: twitterAccountTwitterId,
      },
    })
    if (!authenticatedUser) {
      throw new Error("Twitter account not found")
    }
    console.log(`Processing Twitter Account: ${authenticatedUser.twitterUsername}`)

    const client = new Twitter({
      subdomain: "api", // "api" is the default (change for other subdomains)
      version: "2", // version "1.1" is the default (change for other subdomains)
      extension: false,
      consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
      access_token_key: authenticatedUser.twitterToken as string, // from your User (oauth_token)
      access_token_secret: authenticatedUser.twitterSecretToken as string, // from your User (oauth_token_secret)
    })
    await getEngagement(client, authenticatedUser.twitterId)
  },
  {
    exclusive: true,
  }
)
