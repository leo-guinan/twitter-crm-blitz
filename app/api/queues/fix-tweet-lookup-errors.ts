import db, { TweetLookupStatus } from "db"
import { Queue } from "quirrel/next"
import twitterLikes from "./twitter-likes"
import twitterRetweets from "./twitter-retweets"

export default Queue(
  "api/queues/fix-tweet-lookup-errors", // 👈 the route it's reachable on
  async (job: {}) => {
    const errors = await db.tweetLookupReport.findMany({
      where: {
        tweetLookupStatus: TweetLookupStatus.ERROR,
      },
      select: {
        id: true,
        tweetLookupStatus: true,
        tweetLookedUp: true,
        containingTwitterAccountRefreshReport: {
          select: {
            twitterAccount: true,
          },
        },
      },
    })
    for (const error of errors) {
      await db.tweetLookupReport.update({
        where: {
          id: error.id,
        },
        data: {
          tweetLookupStatus: TweetLookupStatus.PROCESSING,
        },
      })
      await twitterLikes.enqueue({
        tweetId: error.tweetLookedUp.tweetId,
        twitterAccountTwitterId:
          error!.containingTwitterAccountRefreshReport!.twitterAccount!.twitterId,
        reportId: error.id,
      })
      await twitterRetweets.enqueue({
        tweetId: error.tweetLookedUp.tweetId,
        twitterAccountTwitterId:
          error!.containingTwitterAccountRefreshReport!.twitterAccount!.twitterId,
        reportId: error.id,
      })
    }
  },
  {}
)
