import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db, { TwitterAccountRefreshReportStatus } from "db"
import processTwitterAccount from "../queues/process-twitter-account"

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
    await processTwitterAccount.enqueue({
      twitterId: account.twitterId,
    })
  }
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({}))
}
export default handler
