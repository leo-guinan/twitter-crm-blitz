import { CronJob } from "quirrel/next"
import db from "db"
import processTwitterAccount from "./process-twitter-account"

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
      console.log(JSON.stringify(account))
      await processTwitterAccount.enqueue({
        twitterAccountTwitterId: account.twitterId,
      })
    }
  }
)
