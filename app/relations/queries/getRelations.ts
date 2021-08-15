import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetRelationsInput
  extends Pick<Prisma.RelationFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetRelationsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: relations,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.relation.count({ where }),
      query: (paginateArgs) => db.relation.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      relations,
      nextPage,
      hasMore,
      count,
    }
  }
)
