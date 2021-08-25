import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"

import twitterFollowers from "app/api/queues/twitter-followers"
import twitterFollowing from "app/api/queues/twitter-following"
const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")

  const session = await getSession(req, res)
  const userId = session?.userId ? session.userId : -1

  //populate twitter data
  await twitterFollowing.enqueue({ userId })
  await twitterFollowers.enqueue({ userId })
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ userId: session.userId }))
}
export default handler
