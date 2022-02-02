import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetTweetCollection = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetTweetCollection), async ({ id }, ctx) => {
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
          authorAccount: {
            select: {
              twitterId: true,
              twitterName: true,
              twitterProfilePictureUrl: true,
              twitterUsername: true,
            },
          },
        },
      },
    },
  })

  if (!tweetCollection) throw new NotFoundError()

  return tweetCollection.tweets
})
