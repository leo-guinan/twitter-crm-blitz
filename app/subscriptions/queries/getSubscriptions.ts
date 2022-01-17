import { Ctx, paginate, resolver } from "blitz"
import db, { Prisma, SubscriptionCadence } from "db"

interface GetSubscriptionsInput
  extends Pick<Prisma.SubscriptionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSubscriptionsInput, ctx: Ctx) => {
    const orgId = ctx.session.orgId
    const {
      items: subscriptions,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.subscription.count({ where }),
      query: (paginateArgs) =>
        db.subscription.findMany({
          ...paginateArgs,
          where: {
            ...where,
            ownerId: orgId,
            cadence: {
              not: SubscriptionCadence.ONCE,
            },
          },
          orderBy,
          select: {
            twitterAccounts: {
              select: {
                twitterAccount: true,
              },
            },
            name: true,
            id: true,
            type: true,
            status: true,
            cadence: true,
          },
        }),
    })
    return {
      subscriptions,
      nextPage,
      hasMore,
      count,
    }
  }
)
