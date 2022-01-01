import { resolver, NotFoundError, Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const GetCommunitiesForUser = z.object({})

export default resolver.pipe(
  resolver.zod(GetCommunitiesForUser),
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
    const memberships = await db.communityMembership.findMany({
      where: {
        accountId: twitterAccount.id,
      },
      select: {
        community: {
          select: {
            id: true,
            name: true,
            description: true,
            communityMembers: {
              select: {
                id: true,
                account: true,
              },
            },
          },
        },
      },
    })

    const communities = memberships.map((m) => m.community)
    console.log(JSON.stringify(communities))
    return communities
  }
)
