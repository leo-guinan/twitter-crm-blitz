import { CronJob } from "quirrel/next"
import twitterRouteDms from "./twitter-route-dms"
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

    const organizations = await db.organization.findMany({
      where: {
        twitterAccounts: {
          some: {
            twitterToken: {
              not: null,
            },
          },
        },
      },
      select: {
        plan: true,
        twitterAccounts: true,
        memberships: {
          select: {
            user: true,
          },
        },
      },
    })

    console.log(`Orgs: ${JSON.stringify(organizations)}`)

    console.log(`Refreshing ${accountsToRefresh.length} accounts`)

    const report = await db.dailyRefreshReport.create({
      data: {},
    })

    for (const organization of organizations) {
      const account = organization.twitterAccounts[0]
      if (account) {
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
        if (organization.plan.id === 5) {
          await twitterRouteDms.enqueue({
            twitterId: account.twitterId,
            userId: organization?.memberships[0]?.user?.id,
          })
        }
      }
    }
  }
)
