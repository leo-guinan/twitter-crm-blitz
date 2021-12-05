import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetTweetCollection = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetTweetCollection),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const orgId = ctx.session.orgId

    const tweetCollection = await db.tweetCollection.findFirst({
      where: {
        id,
      },
      select: {
        subscription: {
          select: {
            owner: {
              select: {
                id: true,
              },
            },
          },
        },
        tweets: {
          select: {
            tweetId: true,
            tweetCreatedAt: true,
            message: true,
            author: {
              select: {
                twitterId: true,
                name: true,
                profilePictureUrl: true,
              },
            },
          },
        },
      },
    })

    if (!tweetCollection) throw new NotFoundError()

    if (tweetCollection.subscription.owner.id === ctx.session.orgId) return tweetCollection.tweets

    return []
  }
)
