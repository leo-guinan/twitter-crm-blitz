import { resolver } from "blitz"
import db, { CommunityMembershipRole, SubscriptionCadence, SubscriptionType } from "db"
import { z } from "zod"
import twitterBuildCollection from "../../api/queues/twitter-build-collection"

const AmplifyUser = z.object({
  twitterAccountId: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(AmplifyUser),
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

    if (currentAmplifier) return currentAmplifier
    return await db.amplifier.create({
      data: {
        owner: {
          connect: {
            id: loggedInUser.id,
          },
        },
        amplifiedAccount: {
          connect: {
            id: twitterAccountId,
          },
        },
      },
    })
  }
)
