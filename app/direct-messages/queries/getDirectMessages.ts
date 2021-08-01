import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetDirectMessagesInput
  extends Pick<Prisma.DirectMessageFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetDirectMessagesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: directMessages,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.directMessage.count({ where }),
      query: (paginateArgs) => db.directMessage.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      directMessages,
      nextPage,
      hasMore,
      count,
    }
  }
)
