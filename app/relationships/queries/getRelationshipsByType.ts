import { paginate, resolver } from "blitz"
import db, { Prisma, RelationshipType } from "db"

interface GetRelationshipsInput
  extends Pick<Prisma.RelationshipFindManyArgs, "where" | "orderBy" | "skip" | "take"> {
  type: string
}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100, type }: GetRelationshipsInput, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    const organization = await db.organization.findFirst({
      where: {
        id: ctx.session.orgId,
      },

      select: {
        twitterAccounts: {
          select: {
            id: true,
          },
        },
      },
    })
    let typeToSearch
    switch (type) {
      case "follower":
        typeToSearch = RelationshipType.FOLLOWER
        break
      case "following":
        typeToSearch = RelationshipType.FOLLOWING
        break
      case "mutual":
        typeToSearch = RelationshipType.MUTUAL
        break
      default:
        console.log("Shouldn't be here. Something went wrong.")
    }
    if (organization?.twitterAccounts[0]?.id) {
      // TODO: in multi-tenant app, you must add validation to ensure correct tenant
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
              twitterAccountId: organization.twitterAccounts[0].id,
              type: typeToSearch,
            },
            orderBy,
            include: {
              twitterUser: true,
              tags: true,
            },
          }),
      })

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
