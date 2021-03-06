import { Ctx, NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetBoostRequestStatsForUser = z.object({})

export default resolver.pipe(
  resolver.zod(GetBoostRequestStatsForUser),
  resolver.authorize(),
  async ({}, ctx: Ctx) => {
    const orgId = ctx.session?.orgId

    const twitterAccount = await db.twitterAccount.findFirst({
      where: {
        organizationId: orgId,
      },
    })

    if (!twitterAccount) {
      throw new NotFoundError()
    }

    const currentMonth = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)

    return await db.boostRequestRecord.findMany({
      where: {
        requestorTwitterAccountId: twitterAccount.id,
        createdAt: {
          gt: currentMonth,
        },
      },
    })
  }
)
