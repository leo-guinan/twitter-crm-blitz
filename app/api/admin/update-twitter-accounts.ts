import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db, { TwitterAccountRefreshReportStatus } from "db"
import twitterRefreshUser from "app/api/queues/twitter-refresh-user"
import twitterEngagement from "../queues/twitter-engagement"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)

  const accounts = await db.twitterAccount.findMany({})
  const report = await db.dailyRefreshReport.create({
    data: {},
  })

  for (const account of accounts) {
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
    await twitterRefreshUser.enqueue({
      twitterId: account.twitterId,
    })
    await twitterEngagement.enqueue({
      twitterAccountTwitterId: account.twitterId,
      reportId: twitterAccountRefreshReport.id,
    })
  }
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({}))
}
export default handler
