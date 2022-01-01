import { resolver } from "blitz"
import db, { CommunityMembershipRole } from "db"
import { z } from "zod"

const AddUserToCommunity = z.object({
  communityId: z.number(),
  twitterId: z.string(),
})

export default resolver.pipe(
  resolver.zod(AddUserToCommunity),
  resolver.authorize(),
  async ({ communityId, twitterId }, ctx) => {
    //todo: check if user has permission to modify a community

    // todo: check if user is already a member of the community

    const twitterAccount = await db.twitterAccount.findFirst({
      where: {
        twitterId,
        communityMemberships: {
          some: {
            communityId,
          },
        },
      },
      select: {
        communityMemberships: {
          select: {
            community: true,
          },
        },
      },
    })

    if (twitterAccount) {
      //user already in community
      return twitterAccount.communityMemberships[0]
    }

    const membership = await db.communityMembership.create({
      data: {
        community: {
          connect: {
            id: communityId,
          },
        },
        account: {
          connect: {
            twitterId,
          },
        },
        role: CommunityMembershipRole.MEMBER,
      },
      select: {
        community: true,
      },
    })
    if (membership) {
      return membership
    }
    return null
  }
)
