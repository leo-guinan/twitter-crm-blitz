import { resolver } from "blitz"
import db, { CommunityMembershipRole } from "db"
import { z } from "zod"

const CreateCommunity = z.object({
  name: z.string(),
  description: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateCommunity),
  resolver.authorize(),
  async ({ name, description }, ctx) => {
    //todo: check if user has permission to create a community
    const community = await db.community.create({
      data: {
        name,
        description,
      },
    })

    const currentAccount = await db.twitterAccount.findFirst({
      where: {
        organizationId: ctx.session.orgId,
      },
    })

    if (!currentAccount) {
      throw new Error("No account found")
    }

    const membership = await db.communityMembership.create({
      data: {
        community: {
          connect: {
            id: community.id,
          },
        },
        account: {
          connect: {
            id: currentAccount.id,
          },
        },
        role: CommunityMembershipRole.OWNER,
      },
      select: {
        community: true,
      },
    })
    if (membership) {
      return membership.community
    }
    return null
  }
)
