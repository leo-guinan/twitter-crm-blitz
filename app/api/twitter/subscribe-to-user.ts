import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import twitterSubscribeToUser from "app/api/queues/twitter-subscribe-to-user"
import db from "db"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)
  const userId = session.userId
  const orgId = session.orgId
  if (req.body) {
    console.log(req.body)
    const { twitterId } = JSON.parse(req.body)

    const organization = await db.organization.findUnique({
      where: {
        id: orgId,
      },
      include: {
        twitterAccounts: true,
      },
    })

    const twitterAccount = organization!.twitterAccounts[0]

    const twitterAccountId = twitterAccount!.twitterId

    await twitterSubscribeToUser.enqueue({
      twitterAccountId,
      twitterUserToSubscribeTo: twitterId,
      organizationId: orgId,
    })

    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end()
  } else {
    res.statusCode = 500
    console.error("No body to parse.")
    res.end()
  }
}
export default handler
