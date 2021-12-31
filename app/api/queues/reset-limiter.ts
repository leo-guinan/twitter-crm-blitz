import { Queue } from "quirrel/next"
import db, { TweetLookupStatus } from "db"
import twitterLikes from "./twitter-likes"
import twitterRetweets from "./twitter-retweets"

export default Queue(
  "api/queues/reset-limiter",
  async ({ twitterAccountTwitterId }) => {
    await db.twitterAccount.update({
      where: {
        twitterId: twitterAccountTwitterId,
      },
      data: {
        rateLimited: false,
      },
    })
  },
  {}
)
