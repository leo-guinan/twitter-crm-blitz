import { resolver, NotFoundError, Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const IsSubscribedToUser = z.object({
  twitterId: z.string().optional(),
})

export default resolver.pipe(resolver.zod(IsSubscribedToUser), async ({ twitterId }, ctx: Ctx) => {
  const orgId = ctx.session.orgId
  if (!twitterId || !orgId) return false

  const twitterAccount = await db.twitterAccount.findFirst({
    where: { twitterId },
  })

  const subscription = await db.subscription.findFirst({
    where: {
      ownerId: orgId,
      twitterAccounts: {
        some: {
          twitterAccountId: twitterAccount?.id,
        },
      },
    },
  })
  if (subscription) {
    await db.twitterAccountsInSubscriptions.deleteMany({
      where: { subscriptionId: subscription.id },
    })
    await db.subscription.delete({
      where: { id: subscription.id },
    })
  }
})
