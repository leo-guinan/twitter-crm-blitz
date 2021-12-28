import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import twitterEngagement from "app/api/queues/twitter-engagement"
import db, { TwitterAccountRefreshReportStatus } from "../../../db"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)
  if (req.body) {
    console.log(req.body)
    const { twitterAccountId } = JSON.parse(req.body)
    const report = await db.dailyRefreshReport.create({
      data: {},
    })
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
            id: twitterAccountId,
          },
        },
      },
    })
    await twitterEngagement.enqueue({
      twitterAccountTwitterId: twitterAccountId,
      reportId: twitterAccountRefreshReport.id,
    })
  }
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ userId: session.userId }))
}
export default handler
