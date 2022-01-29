import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import processTwitterAccount from "../queues/process-twitter-account"
import db from "../../../db"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)
  if (req.body) {
    console.log(req.body)
    const { twitterAccountId } = JSON.parse(req.body)
    const report = await db.dailyRefreshReport.create({
      data: {},
    })

    await processTwitterAccount.enqueue({
      twitterId: twitterAccountId,
    })
  }
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ userId: session.userId }))
}
export default handler
