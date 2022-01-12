import { Queue } from "quirrel/next"
import db, { TweetLookupStatus } from "db"
import twitterRouteDms from "./twitter-route-dms"
import twitterLikes from "./twitter-likes"
import twitterRetweets from "./twitter-retweets"
import resetLimiter from "./reset-limiter"
export default Queue(
  "api/queues/rescheduler",
  async ({ type, payload }) => {
    if (type === "likes") {
      await twitterLikes.enqueue(payload, {
        runAt: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes from now
      })
    } else if (type === "retweets") {
      await twitterRetweets.enqueue(payload, {
        runAt: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes from now
      })
    } else if (type === "dms") {
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
    } else {
      throw new Error(`Unknown type: ${type}`)
    }
  },
  {}
)
