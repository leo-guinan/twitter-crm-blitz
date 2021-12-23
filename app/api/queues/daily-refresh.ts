import { CronJob } from "quirrel/next"
import twitterEngagement from "./twitter-engagement"
import db from "db"

export default CronJob(
  "api/queues/daily-refresh", // 👈 the route that it's reachable on
  "0 0 * * 0", // once a week for now
  async () => {
    const accountsToRefresh = await db.twitterAccount.findMany({
      where: {
        twitterToken: {
          not: null,
        },
      },
    })

    for (const account of accountsToRefresh) {
      await twitterEngagement.enqueue({
        twitterAccountTwitterId: account.twitterId,
      })
    }
  }
)
