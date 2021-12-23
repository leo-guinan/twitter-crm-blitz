import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import twitterEngagement from "app/api/queues/twitter-engagement"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)
  if (req.body) {
    console.log(req.body)
    const { twitterAccountId } = JSON.parse(req.body)

    await twitterEngagement.enqueue({
      twitterAccountTwitterId: twitterAccountId,
    })
  }
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ userId: session.userId }))
}
export default handler
