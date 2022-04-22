import { resolver, NotFoundError, Ctx } from "blitz"
import db, { SubscriptionCadence, SubscriptionType } from "db"
import { z } from "zod"

const SubscribeToUser = z.object({
  twitterId: z.string().optional(),
})

export default resolver.pipe(resolver.zod(SubscribeToUser), async ({ twitterId }, ctx: Ctx) => {
  const orgId = ctx.session.orgId
  if (!twitterId || !orgId) return false

  const twitterAccount = await db.twitterAccount.findFirst({
    where: { twitterId },
  })

  if (!twitterAccount) throw new NotFoundError()

  return await db.subscription.create({
    data: {
      name: `Subscription to ${twitterAccount.twitterName}`,
      cadence: SubscriptionCadence.WEEKLY,
      owner: {
        connect: {
          id: orgId,
        },
      },
      twitterAccounts: {
        create: [
          {
            twitterAccount: {
              connect: {
                id: twitterAccount.id,
              },
            },
            type: SubscriptionType.PERSONAL,
          },
        ],
      },
    },
  })
})
