import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetUsersInput
  extends Pick<Prisma.UserFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetUsersInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const users = await db.user.findMany({
      where,
      orderBy,
      include: {
        memberships: {
          include: {
            organization: {
              include: {
                twitterAccounts: true,
              },
            },
          },
        },
      },
    })
    return users
  }
)
