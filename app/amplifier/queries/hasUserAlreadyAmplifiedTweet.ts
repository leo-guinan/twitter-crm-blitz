import { Ctx, NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const HasUserAlreadyAmplifiedTweet = z.object({
  tweetId: z.string(),
})

export default resolver.pipe(
  resolver.zod(HasUserAlreadyAmplifiedTweet),
  resolver.authorize(),
  async ({ tweetId }, ctx: Ctx) => {
    const orgId = ctx.session?.orgId

    const twitterAccount = await db.twitterAccount.findFirst({
      where: {
        organizationId: orgId,
      },
    })

    const requestsForTweet = await db.boostRequest.findMany({
      where: {
        tweetId,
      },
    })

    // return !requestsForTweet || requestsForTweet.filter()

    if (!twitterAccount) {
      throw new NotFoundError()
    }
    // return await db.amplifier.findMany({
    //   where: {
    //     amplifiedAccountId: twitterAccount.id,
    //   },
    //   select: {
    //     owner: true,
    //     amplifiedAccount: true,
    //   },
    // })
    return false
  }
)
