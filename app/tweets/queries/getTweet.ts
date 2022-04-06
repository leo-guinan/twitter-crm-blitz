import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetTweet = z.object({
  // This accepts type of undefined, but is required at runtime
  tweetId: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetTweet), async ({ tweetId }, ctx) => {
  const tweet = await db.tweet.findFirst({
    where: {
      tweetId,
    },
    include: {
      authorAccount: true,
    },
  })

  if (!tweet) throw new NotFoundError()

  return tweet
})
