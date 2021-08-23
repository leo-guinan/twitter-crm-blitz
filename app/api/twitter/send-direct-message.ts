//definet id 1338107290256367616

import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"

import twitterSendDMs from "app/api/queues/twitter-send-dm"
const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")

  const session = await getSession(req, res)
  const userId = session?.userId ? session.userId : -1

  const { message, twitterUserIds } = JSON.parse(req.body)

  console.log("send to " + twitterUserIds)
  console.log("message: " + message)
  await twitterSendDMs.enqueue({
    fromUserId: userId,
    toTwitterUserIds: twitterUserIds,
    message: message,
  })
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ userId: session.userId }))
}
export default handler
