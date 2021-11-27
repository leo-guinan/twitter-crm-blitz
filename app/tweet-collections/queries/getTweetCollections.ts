import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTweetCollectionsInput
  extends Pick<Prisma.TweetCollectionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTweetCollectionsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: tweetCollections,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.tweetCollection.count({ where }),
      query: (paginateArgs) => db.tweetCollection.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      tweetCollections,
      nextPage,
      hasMore,
      count,
    }
  }
)
