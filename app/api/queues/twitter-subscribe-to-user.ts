import { Queue } from "quirrel/next"
import twitterBuildCollection from "./twitter-build-collection"
import db, { SubscriptionCadence, SubscriptionType } from "db"

export default Queue(
  "api/queues/twitter-subscribe-to-user", // 👈 the route it's reachable on
  async (job: { twitterAccountId; twitterUserToSubscribeTo; organizationId }) => {
    const twitterAccountToSubscribeTo = await db.twitterAccount.findFirst({
      where: {
        twitterId: job.twitterUserToSubscribeTo,
      },
    })

    //first, make sure subscription doesn't already exist
    const existingSubscription = await db.twitterAccount.findFirst({
      where: {
        twitterId: job.twitterUserToSubscribeTo,
        subscriptions: {
          some: {
            subscription: {
              is: {
                ownerId: job.organizationId,
              },
            },
          },
        },
      },
      select: {
        id: true,
        subscriptions: {
          include: {
            twitterAccount: true,
            subscription: true,
          },
        },
      },
    })

    if (!existingSubscription && twitterAccountToSubscribeTo) {
      const subscription = await db.subscription.create({
        data: {
          name: `Subscription to ${twitterAccountToSubscribeTo.twitterName}`,
          cadence: SubscriptionCadence.WEEKLY,
          owner: {
            connect: {
              id: job.organizationId,
            },
          },
          twitterAccounts: {
            create: [
              {
                twitterAccount: {
                  connect: {
                    id: twitterAccountToSubscribeTo.id,
                  },
                },
                type: SubscriptionType.PERSONAL,
              },
            ],
          },
        },
      })

      await twitterBuildCollection.enqueue({
        subscriptionId: subscription.id,
      })
    }
  },
  {
    exclusive: true,
  }
)
