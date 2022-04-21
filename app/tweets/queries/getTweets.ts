import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTweetsInCollectionInput
  extends Pick<Prisma.TweetFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTweetsInCollectionInput, ctx) => {
    const orgId = ctx.session.orgId

    const organization = await db.organization.findUnique({
      where: {
        id: orgId,
      },
      include: {
        twitterAccounts: true,
      },
    })

    const loggedInUser = organization!.twitterAccounts[0]

    if (!loggedInUser)
      return {
        tweets: [],
        nextPage: null,
        hasMore: false,
        count: 0,
      }

    const {
      items: tweets,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.tweet.count({ where }),
      query: (paginateArgs) =>
        db.tweet.findMany({
          ...paginateArgs,
          where: {
            ...where,
            authorAccountId: loggedInUser.id,
          },
          orderBy,
        }),
    })

    console.log(tweets.slice(0, 10))
    return {
      tweets,
      nextPage,
      hasMore,
      count,
    }
  }
)
