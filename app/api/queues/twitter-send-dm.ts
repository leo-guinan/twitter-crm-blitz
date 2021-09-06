import { Queue } from "quirrel/next"
import db from "db"
import Twitter from "twitter-lite"
import createCheckoutSession from "app/users/mutations/createCheckoutSession"
import customerPortal from "app/users/mutations/customerPortal"
import stripe from "integrations/stripe"

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
                trial: true,
                twitterAccounts: {
                  select: {
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

    if (
      !user?.memberships[0]?.organization?.twitterAccounts[0]?.twitterToken ||
      !user?.memberships[0]?.organization?.twitterAccounts[0]?.twitterSecretToken
    ) {
      console.log("authentication error")
      return
    }
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
      if (
        !user?.memberships[0]?.organization?.trial &&
        user?.memberships[0]?.organization?.subscriptionStatus !== "active"
      ) {
        console.error("User not authorized to send DM. Please check subscription status")
        //figure out how to send user to subscribe link
        return
      } else if (
        user?.memberships[0]?.organization?.subscriptionStatus !== "active" &&
        user?.memberships[0]?.organization?.trial &&
        user?.memberships[0]?.organization?.trial?.totalDMs -
          user?.memberships[0]?.organization?.trial?.usedDMs <
          job.toTwitterUserIds.length
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
            if (user?.memberships[0]?.organization?.trial) {
              const trial = await db.trial.update({
                where: {
                  id: user?.memberships[0]?.organization?.trial?.id,
                },
                data: {
                  usedDMs: {
                    increment: 1,
                  },
                },
              })
              if (trial.usedDMs >= trial.totalDMs) {
                await db.trial.delete({
                  where: {
                    id: user.memberships[0].organization.trial.id,
                  },
                })
              }
            } else {
              if (
                user?.memberships[0]?.organization?.subscriptionId &&
                (user?.memberships[0]?.organization?.price ===
                  process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC ||
                  user?.memberships[0]?.organization?.price ===
                    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM)
              ) {
                console.log("Sending usage record to stripe for user: " + user.id)
                const usageRecord = await stripe.subscriptionItems.createUsageRecord(
                  user?.memberships[0]?.organization?.subscriptionId,
                  { quantity: 1, timestamp: Math.ceil(Date.now() / 1000) }
                )
              }
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
