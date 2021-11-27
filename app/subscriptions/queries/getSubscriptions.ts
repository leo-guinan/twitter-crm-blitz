import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetSubscriptionsInput
  extends Pick<Prisma.SubscriptionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSubscriptionsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: subscriptions,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.subscription.count({ where }),
      query: (paginateArgs) => db.subscription.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      subscriptions,
      nextPage,
      hasMore,
      count,
    }
  }
)
