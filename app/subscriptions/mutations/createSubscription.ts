import { resolver } from "blitz"
import db, { CommunityMembershipRole, SubscriptionCadence, SubscriptionType } from "db"
import { z } from "zod"
import twitterBuildCollection from "../../api/queues/twitter-build-collection"

const CreateSubscription = z.object({
  name: z.string(),
  cadence: z.enum([
    SubscriptionCadence.DAILY,
    SubscriptionCadence.WEEKLY,
    SubscriptionCadence.MONTHLY,
    SubscriptionCadence.ONCE,
  ]),
  twitterAccounts: z.array(
    z.object({
      id: z.number(),
      twitterId: z.string(),
      twitterUsername: z.string().optional(),
      twitterName: z.string().optional(),
      twitterBio: z.string().optional(),
      twitterProfilePictureUrl: z.string().optional(),
    })
  ),
})

export default resolver.pipe(
  resolver.zod(CreateSubscription),
  resolver.authorize(),
  async ({ name, cadence, twitterAccounts }, ctx) => {
    const orgId = ctx.session.orgId
    const subscription = await db.subscription.create({
      data: {
        name,
        cadence,
        owner: {
          connect: {
            id: orgId,
          },
        },
      },
    })

    for (const twitterAccount of twitterAccounts) {
      await db.twitterAccountsInSubscriptions.create({
        data: {
          subscription: {
            connect: {
              id: subscription.id,
            },
          },
          twitterAccount: {
            connect: {
              id: twitterAccount.id,
            },
          },
          type: SubscriptionType.CUSTOM,
        },
      })
    }

    await twitterBuildCollection.enqueue({
      subscriptionId: subscription.id,
    })

    return subscription
  }
)
