import { Ctx, paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTweetCollectionsInput
  extends Pick<Prisma.TweetCollectionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTweetCollectionsInput, ctx: Ctx) => {
    const {
      items: tweetCollections,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.tweetCollection.count({ where }),
      query: (paginateArgs) =>
        db.tweetCollection.findMany({
          ...paginateArgs,
          where: {
            subscription: {
              ownerId: ctx.session.orgId,
            },
          },
          orderBy,
        }),
    })
    console.log(JSON.stringify(tweetCollections))
    return {
      tweetCollections,
      nextPage,
      hasMore,
      count,
    }
  }
)
