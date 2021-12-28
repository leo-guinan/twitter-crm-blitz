import { CronJob } from "quirrel/next"
import twitterEngagement from "./twitter-engagement"
import twitterRefreshUser from "./twitter-refresh-user"
import db, { TwitterAccountRefreshReportStatus } from "db"

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

    const report = await db.dailyRefreshReport.create({
      data: {},
    })

    for (const account of accountsToRefresh) {
      const twitterAccountRefreshReport = await db.twitterAccountRefreshReport.create({
        data: {
          status: TwitterAccountRefreshReportStatus.QUEUED,
          containingDailyReport: {
            connect: {
              id: report.id,
            },
          },
          twitterAccount: {
            connect: {
              id: account.id,
            },
          },
        },
      })
      await twitterRefreshUser.enqueue({ twitterId: account.twitterId })
      await twitterEngagement.enqueue({
        twitterAccountTwitterId: account.twitterId,
        reportId: twitterAccountRefreshReport.id,
      })
      await db.twitterAccountRefreshReport.update({
        where: {
          id: twitterAccountRefreshReport.id,
        },
        data: {
          status: TwitterAccountRefreshReportStatus.PROCESSING,
        },
      })
    }
  }
)
