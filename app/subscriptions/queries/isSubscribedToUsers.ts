import { Ctx, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const IsSubscribedToUsers = z.object({
  twitterIds: z.string().array(),
})

export default resolver.pipe(
  resolver.zod(IsSubscribedToUsers),
  resolver.authorize(),
  async ({ twitterIds }, ctx: Ctx) => {
    if (!twitterIds) return false
    const orgId = ctx.session.orgId

    const twitterAccounts = await db.twitterAccount.findMany({
      where: {
        twitterId: {
          in: twitterIds,
        },
      },
    })

    const results = {}

    for (const twitterAccount of twitterAccounts) {
      if (twitterAccount?.twitterId) {
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
        results[twitterAccount.twitterId] = !!subscription
      }
    }

    return results
  }
)
