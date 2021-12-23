import { CronJob } from "quirrel/next"
import twitterEngagement from "./twitter-engagement"
import twitterRefreshUser from "./twitter-refresh-user"
import db from "db"

export default CronJob(
  "api/queues/daily-refresh", // 👈 the route that it's reachable on
  "0 0 * * *", // once a day at 12am
  async () => {
    const accountsToRefresh = await db.twitterAccount.findMany({
      where: {
        twitterToken: {
          not: null,
        },
      },
    })

    for (const account of accountsToRefresh) {
      await twitterRefreshUser.enqueue({ twitterId: account.twitterId })
      await twitterEngagement.enqueue({
        twitterAccountTwitterId: account.twitterId,
      })
    }
  }
)
