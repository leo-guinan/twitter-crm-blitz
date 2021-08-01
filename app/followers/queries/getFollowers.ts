import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetFollowersInput
  extends Pick<Prisma.FollowerFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetFollowersInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: followers,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.follower.count({ where }),
      query: (paginateArgs) => db.follower.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      followers,
      nextPage,
      hasMore,
      count,
    }
  }
)
