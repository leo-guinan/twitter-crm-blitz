import { resolver, NotFoundError, Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const IsAmplifyingUser = z.object({
  twitterAccountId: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(IsAmplifyingUser),
  async ({ twitterAccountId }, ctx: Ctx) => {
    const orgId = ctx.session.orgId
    if (!twitterAccountId || !orgId) return false

    const organization = await db.organization.findUnique({
      where: {
        id: orgId,
      },
      include: {
        twitterAccounts: true,
      },
    })

    const loggedInUser = organization!.twitterAccounts[0]

    if (!loggedInUser) return false

    const amplifier = await db.amplifier.findFirst({
      where: {
        ownerId: loggedInUser.id,
        amplifiedAccountId: twitterAccountId,
      },
    })

    return !!amplifier
  }
)
