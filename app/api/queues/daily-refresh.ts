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
      await processTwitterAccount.enqueue({
        twitterAccountTwitterId: account.twitterId,
      })
    }

    const subscriptionsToRefresh = await db.twitterAccountsInSubscriptions.findMany({
      include: {
        twitterAccount: true,
      },
      distinct: ["twitterAccountId"],
    })
    for (const subscription of subscriptionsToRefresh) {
      await processTwitterAccount.enqueue({
        twitterAccountTwitterId: subscription.twitterAccount.twitterId,
      })
    }

    const slugsToRefresh = await db.twitterAccount.findMany({
      where: {
        slug: {
          not: null,
        },
      },
    })
    for (const slug of slugsToRefresh) {
      await processTwitterAccount.enqueue({
        twitterAccountTwitterId: slug.twitterId,
      })
    }
  }
)
