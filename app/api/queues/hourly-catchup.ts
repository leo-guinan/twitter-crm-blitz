import { CronJob } from "quirrel/next"
import db, { TweetAction } from "db"
import { getClientForAccount } from "../../util/twitter/client"
import { getRetweets } from "../../util/twitter/retweets"
import { getLikes } from "../../util/twitter/likes"

export default CronJob(
  "api/queues/hourly-catchup", // 👈 the route that it's reachable on
  "0 * * * *", // hourly
  async () => {
    const tweetsToProcess = await db.tweetsToProcess.findMany({
      include: {
        twitterAccount: true,
      },
    })

    for (const tweet of tweetsToProcess) {
      const client = getClientForAccount(tweet.twitterAccount)
      switch (tweet.action) {
        case TweetAction.RETWEET:
          await getRetweets(client, tweet.twitterAccount.twitterId, tweet.tweetId)
          break
        case TweetAction.LIKE:
          await getLikes(client, tweet.twitterAccount.twitterId, tweet.tweetId)
          break
        default:
          break
      }
      await db.tweetsToProcess.delete({
        where: {
          id: tweet.id,
        },
      })
    }
  }
)
