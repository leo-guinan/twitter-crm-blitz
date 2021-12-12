import { resolver, NotFoundError, Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const IsSubscribedToUser = z.object({
  twitterId: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(IsSubscribedToUser),
  resolver.authorize(),
  async ({ twitterId }, ctx: Ctx) => {
    if (!twitterId) return false
    const orgId = ctx.session.orgId

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
    return !!subscription
  }
)
