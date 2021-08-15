//definet id 1338107290256367616

import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"

import twitterSendDMs from "app/api/queues/twitter-send-dm"
import twitterFollowing from "app/api/queues/twitter-following"
const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")

  const session = await getSession(req, res)
  const userId = session?.userId ? session.userId : -1

  await twitterSendDMs.enqueue({
    fromUserId: userId,
    toTwitterUserIds: ["1338107290256367616"],
    message: "testing send DMs",
  })
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ userId: session.userId }))
}
export default handler
