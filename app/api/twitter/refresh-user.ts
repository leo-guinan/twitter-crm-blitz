import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import twitterRefreshUser from "app/api/queues/twitter-refresh-user"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)
  const { twitterId } = JSON.parse(req.body)
  await twitterRefreshUser.enqueue({
    twitterId,
  })
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ userId: session.userId }))
}

export default handler
