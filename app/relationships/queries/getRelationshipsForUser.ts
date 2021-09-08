import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetRelationshipsInput
  extends Pick<Prisma.RelationshipFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetRelationshipsInput, ctx) => {
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
    const twitterAccountId = currentOrganization?.twitterAccounts[0]?.id
    if (twitterAccountId) {
      const {
        items: relationships,
        hasMore,
        nextPage,
        count,
      } = await paginate({
        skip,
        take,
        count: () => db.relationship.count({ where }),
        query: (paginateArgs) =>
          db.relationship.findMany({
            ...paginateArgs,
            where: {
              twitterAccountId,
            },
            orderBy,
            include: {
              twitterUser: true,
              tags: true,
            },
          }),
      })
      console.log("relationship: " + JSON.stringify(relationships[0]))
      return {
        relationships,
        nextPage,
        hasMore,
        count,
      }
    } else {
      return {
        relationships: [],
        nextPage: 0,
        hasMore: false,
        count: 0,
      }
    }
  }
)
