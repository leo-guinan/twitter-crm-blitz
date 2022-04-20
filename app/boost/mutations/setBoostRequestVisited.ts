import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const SetBoostRequestVisited = z.object({
  tweetId: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(SetBoostRequestVisited),
  resolver.authorize(),
  async ({ tweetId }, ctx) => {
    if (!tweetId) return null
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

    if (!loggedInUser) return false

    await db.boostRequestRecord.updateMany({
      where: {
        requestedTwitterAccountId: loggedInUser.id,
        boostedTweetId: tweetId,
      },
      data: {
        visited: true,
      },
    })
  }
)
