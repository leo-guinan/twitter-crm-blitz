import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db from "db"
import twitterRefreshUser from "app/api/queues/twitter-refresh-user"
import twitterEngagement from "../queues/twitter-engagement"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)

  const accounts = await db.twitterAccount.findMany({})
  for (const account of accounts) {
    await twitterRefreshUser.enqueue({
      twitterId: account.twitterId,
    })
    await twitterEngagement.enqueue({
      twitterAccountTwitterId: account.twitterId,
    })
  }
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({}))
}
export default handler
