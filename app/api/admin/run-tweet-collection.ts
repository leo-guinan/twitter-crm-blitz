import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db, { GlobalRole } from "db"
import Twitter from "twitter-lite"
import twitterBuildCollection from "app/api/queues/twitter-build-collection"
const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)

  const currentUser = await db.user.findFirst({
    where: {
      id: session.userId || -1,
    },
  })

  if (!currentUser || currentUser.role !== GlobalRole.SUPERADMIN) {
    res.statusCode = 401
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify("error: Unauthorized"))
  } else {
    await twitterBuildCollection.enqueue({
      subscriptionId: 46,
    })
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({}))
  }
}
export default handler
