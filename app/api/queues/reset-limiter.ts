import { Queue } from "quirrel/next"
import db, { TweetLookupStatus } from "db"

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
