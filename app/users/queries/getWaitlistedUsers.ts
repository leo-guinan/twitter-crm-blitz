import { paginate, resolver } from "blitz"
import db, { Prisma, GlobalRole } from "db"

interface GetUsersInput
  extends Pick<Prisma.UserFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetUsersInput, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const currentUser = await db.user.findFirst({
      where: {
        id: ctx.session.userId,
      },
      select: {
        role: true,
      },
    })
    if (currentUser && currentUser.role === GlobalRole.SUPERADMIN) {
      const results = await db.twitterAccountWaitList.findMany({ select: { twitterAccount: true } })
      console.log("results: " + JSON.stringify(results))
      return results
    }
    return []
  }
)
