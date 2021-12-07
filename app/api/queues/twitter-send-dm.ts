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

        memberships: {
          select: {
            organization: {
              select: {
                subscriptionStatus: true,
                price: true,
                subscriptionId: true,
                twitterAccounts: {
                  select: {
                    id: true,
                    twitterToken: true,
                    twitterSecretToken: true,
                    twitterId: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    const client = new Twitter({
      subdomain: "api", // "api" is the default (change for other subdomains)
      version: "1.1", // version "1.1" is the default (change for other subdomains)
      consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
      access_token_key: user?.memberships[0]?.organization?.twitterAccounts[0]
        ?.twitterToken as string, // from your User (oauth_token)
      access_token_secret: user?.memberships[0]?.organization?.twitterAccounts[0]
        ?.twitterSecretToken as string, // from your User (oauth_token_secret)
    })

    if (user) {
      for (const twitterUserId of job.toTwitterUserIds) {
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
          .catch(async (error) => {
            console.error(error)
          })
      }
    }
  }
)
