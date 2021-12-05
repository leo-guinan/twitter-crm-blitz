import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db, { RelationshipType, ProcessingStatus } from "db"
import twitterFollowers from "app/api/queues/twitter-followers"
import twitterFollowing from "app/api/queues/twitter-following"
import twitterEngagement from "app/api/queues/twitter-engagement"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)
  if (req.body) {
    console.log(req.body)
    const { twitterAccountId } = JSON.parse(req.body)

    await twitterEngagement.enqueue({
      twitterAccountId,
    })
  }
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ userId: session.userId }))
}
export default handler
