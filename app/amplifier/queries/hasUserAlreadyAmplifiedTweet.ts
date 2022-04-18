import { Ctx, NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const HasUserAlreadyAmplifiedTweet = z.object({
  tweetId: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(HasUserAlreadyAmplifiedTweet),
  resolver.authorize(),
  async ({ tweetId }, ctx: Ctx) => {
    if (!tweetId) {
      throw new NotFoundError()
    }
    const orgId = ctx.session?.orgId

    const twitterAccount = await db.twitterAccount.findFirst({
      where: {
        organizationId: orgId,
      },
    })

    if (!twitterAccount) {
      throw new NotFoundError()
    }

    const record = await db.boostRequestRecord.findFirst({
      where: {
        requestorTwitterAccountId: twitterAccount.id,
        boostedTweetId: tweetId,
      },
    })
    return !!record
  }
)
