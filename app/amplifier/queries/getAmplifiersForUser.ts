import { Ctx, NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetAmplifiersForUser = z.object({})

export default resolver.pipe(
  resolver.zod(GetAmplifiersForUser),
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
    return await db.amplifier.findMany({
      where: {
        ownerId: twitterAccount.id,
      },
      select: {
        owner: true,
        amplifiedAccount: true,
      },
    })
  }
)
