import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTweetsInCollectionInput
  extends Pick<Prisma.TweetFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTweetsInCollectionInput) => {
    const {
      items: tweets,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.tweet.count({ where }),
      query: (paginateArgs) => db.tweet.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      tweets,
      nextPage,
      hasMore,
      count,
    }
  }
)
