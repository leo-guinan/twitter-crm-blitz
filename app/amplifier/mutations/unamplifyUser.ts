import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UnamplifyUser = z.object({
  twitterAccountId: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(UnamplifyUser),
  resolver.authorize(),
  async ({ twitterAccountId }, ctx) => {
    if (!twitterAccountId) return false
    const orgId = ctx.session.orgId

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

    const currentAmplifier = await db.amplifier.findFirst({
      where: {
        ownerId: loggedInUser.id,
        amplifiedAccountId: twitterAccountId,
      },
    })

    if (!currentAmplifier) return false
    await db.amplifier.delete({
      where: {
        id: currentAmplifier.id,
      },
    })

    return true
  }
)
