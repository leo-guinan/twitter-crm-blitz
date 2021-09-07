import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetRelationshipsInput
  extends Pick<Prisma.RelationshipFindManyArgs, "where" | "orderBy" | "skip" | "take"> {
  tag: string
}

export default resolver.pipe(resolver.authorize(), async ({ tag }: GetRelationshipsInput, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
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
  if (currentOrganization.twitterAccounts.id) {
    const relationships = await db.relationship.findMany({
      where: {
        twitterAccountId: currentOrganization.twitterAccounts.id,

        tags: {
          some: {
            value: tag,
          },
        },
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
})
