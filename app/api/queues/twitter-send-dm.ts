import { Queue } from "quirrel/next"
import db from "db"
import Twitter from "twitter-lite"
import createCheckoutSession from "app/users/mutations/createCheckoutSession"
import customerPortal from "app/users/mutations/customerPortal"
import { loadStripe } from "@stripe/stripe-js"

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
        trial: true,
        subscriptionStatus: true,
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
      if (!user.trial && user.subscriptionStatus === "incomplete") {
        console.error("User not authorized to send DM. Please check subscription status")
        //figure out how to send user to subscribe link
        return
      } else if (
        user.trial &&
        user.trial.totalDMs - user.trial.usedDMs < job.toTwitterUserIds.length
      ) {
        console.log("not enough trial DMs remaining to send all DMs. Please check status")
        return
      }

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
            if (user.trial) {
              await db.trial.update({
                where: {
                  id: user.trial.id,
                },
                data: {
                  usedDMs: user.trial.usedDMs + 1,
                },
              })
            }
          })
          .catch(async (error) => {
            console.error(error)
            if (error.code === 349) {
              console.error("Unable to send messages to user: " + twitterUserId)
              await db.relationship.updateMany({
                where: {
                  userId: job.fromUserId,
                  twitterUserId,
                },
                data: {
                  status: "Unable to receive DM",
                },
              })
            }
          })
      })
    }
  }
)
