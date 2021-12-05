import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetRelationshipsInput extends Pick<Prisma.RelationshipFindUniqueArgs, "where"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where }: GetRelationshipsInput, ctx) => {
    const currentOrganization = await db.organization.findFirst({
      where: {
        id: ctx.session.orgId,
      },
      select: {
        twitterAccounts: {
          select: {
            id: true,
            twitterId: true,
          },
        },
      },
    })
    const twitterAccountId = currentOrganization?.twitterAccounts[0]?.id
    if (twitterAccountId) {
      const relationships = await db.relationship.findFirst({
        where: {
          twitterAccountId,
        },

        include: {
          twitterUser: true,
          tags: true,
        },
      })

      return relationships
    } else {
      return []
    }
  }
)
