import db, { SubscriptionCadence, SubscriptionType } from "../../../db"
import twitterBuildCollection from "./twitter-build-collection"
import { Queue } from "quirrel/next"

export default Queue(
  "api/queues/send-sample-personal-feed", // 👈 the route it's reachable on
  async (job: { orgId }) => {
    const accountIdToLookup = "1325102346792218629"

    const subscription = await db.subscription.create({
      data: {
        name: "Daily Engagement Feed",
        cadence: SubscriptionCadence.ONCE,
        ownerId: job.orgId,
        twitterAccounts: {
          create: {
            type: SubscriptionType.FREE,
            twitterAccount: {
              connect: {
                twitterId: accountIdToLookup,
              },
            },
          },
        },
      },
    })

    await twitterBuildCollection.enqueue({ subscriptionId: subscription.id })
  },
  { exclusive: true }
)
