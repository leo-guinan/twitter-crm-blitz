import db from "../../../db"
import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import { refreshUser } from "../../util/twitter/populate-user"
import { getClientForAccount } from "../../util/twitter/client"
import { scoreTweet } from "../../util/twitter/scoreTweet"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)

  const { tweetId } = JSON.parse(req.body)

  if (!session.userId) {
    res.statusCode = 401
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify("Unauthorized"))
  } else {
    const orgId = session?.orgId

    const twitterAccount = await db.twitterAccount.findFirst({
      where: {
        organizationId: orgId,
      },
    })

    if (!twitterAccount) {
      res.statusCode = 401
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify("Unauthorized"))
    } else {
      const client = await getClientForAccount(twitterAccount)
      const score = await scoreTweet(client, twitterAccount.twitterId, tweetId)
      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify({ score }))
    }
  }
}

export default handler
