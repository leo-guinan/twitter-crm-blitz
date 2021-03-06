import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import twitterWeeklyDigest from "app/api/queues/twitter-subscribe-to-user"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)
  if (req.body) {
    console.log(req.body)
    const { twitterAccountId } = JSON.parse(req.body)

    await twitterWeeklyDigest.enqueue({
      twitterAccountId,
      twitterUserToSubscribeTo: "",
      organizationId: "",
    })
  }
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ userId: session.userId }))
}
export default handler
