import { Queue } from "quirrel/next"
import db from "db"
import Twitter from "twitter-lite"

export default Queue(
  "api/queues/twitter-send-dm", // 👈 the route it's reachable on
  async (job: { fromUserId: number; toTwitterUserIds: string[]; message: string }) => {
    const user = await db.user.findFirst({
      where: { id: job.fromUserId },
      select: {
        id: true,
        twitterToken: true,
        twitterSecretToken: true,
        twitterId: true,
      },
    })

    console.log(user)

    const client = new Twitter({
      subdomain: "api", // "api" is the default (change for other subdomains)
      version: "1.1", // version "1.1" is the default (change for other subdomains)
      consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
      access_token_key: user?.twitterToken as string, // from your User (oauth_token)
      access_token_secret: user?.twitterSecretToken as string, // from your User (oauth_token_secret)
    })

    if (user) {
      job.toTwitterUserIds.forEach((twitterUserId) => {
        const params = {
          event: {
            type: "message_create",
            message_create: {
              target: {
                recipient_id: twitterUserId,
              },
              message_data: {
                text: job.message,
              },
            },
          },
        }
        client
          .post("direct_messages/events/new", params)
          .then(async (results) => {
            console.log(results)
          })
          .catch(console.error)
      })
    }
  }
)
