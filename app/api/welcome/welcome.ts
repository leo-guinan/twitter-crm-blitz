import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db from "../../../db"
import sendEngagedFeed from "../queues/send-engaged-feed"
import sendSamplePersonalFeed from "../queues/send-sample-personal-feed"
const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)

  if (req.body) {
    const { email } = JSON.parse(req.body)

    const userId = session.userId

    const orgId = session.orgId

    const twitterAccount = await db.twitterAccount.findFirst({
      where: {
        organizationId: orgId,
      },
    })

    if (userId) {
      const user = await db.user.update({
        where: { id: userId },
        data: {
          email,
        },
      })

      await sendEngagedFeed.enqueue({
        twitterAccountId: twitterAccount?.id,
        orgId,
      })

      await sendSamplePersonalFeed.enqueue({
        orgId,
      })
    }
  }
  // save email
  // send personal subscription from me
  // send community subscription (spark) TODO add
  // send engagement email

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ userId: session.userId }))
}

export default handler
