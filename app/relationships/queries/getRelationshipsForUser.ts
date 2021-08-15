import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetRelationshipsInput
  extends Pick<Prisma.RelationshipFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetRelationshipsInput, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    where = where || {}
    where.userId = ctx.session.userId
    const {
      items: relationships,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.relationship.count({ where }),
      query: (paginateArgs) => db.relationship.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      relationships,
      nextPage,
      hasMore,
      count,
    }
  }
)
