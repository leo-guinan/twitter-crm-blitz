import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db, { TwitterAccountRefreshReportStatus } from "db"
import twitterRouteDms from "../queues/twitter-route-dms"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)

  const accounts = await db.twitterAccount.findMany({
    where: {
      twitterToken: {
        not: null,
      },
    },
  })
  for (const account of accounts) {
    await twitterRouteDms.enqueue({
      twitterId: account.twitterId,
      userId: session.userId,
    })
  }
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({}))
}
export default handler
