import { Queue } from "quirrel/next"
import twitterRouteDms from "./twitter-route-dms"
import resetLimiter from "./reset-limiter"
import rerunLike from "./rerun-like"
import rerunRetweet from "./rerun-retweet"

export default Queue(
  "api/queues/rescheduler",
  async ({ type, payload }) => {
    if (type === "dms") {
      await twitterRouteDms.enqueue(payload, {
        runAt: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes from now
      })
    } else if (type === "rateLimited") {
      await resetLimiter.enqueue(
        {
          twitterAccountTwitterId: payload.twitterAccountTwitterId,
        },
        {
          runAt: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes from now
        }
      )
    } else if (type === "rateLimitedLike") {
      await rerunLike.enqueue(
        {
          twitterId: payload.twitterId,
          tweetId: payload.tweetId,
        },
        {
          runAt: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes from now
        }
      )
    } else if (type === "rateLimitedRetweet") {
      await rerunRetweet.enqueue(
        {
          twitterId: payload.twitterId,
          tweetId: payload.tweetId,
        },
        {
          runAt: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes from now
        }
      )
    } else {
      throw new Error(`Unknown type: ${type}`)
    }
  },
  {}
)
