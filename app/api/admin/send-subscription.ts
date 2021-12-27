import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db, { GlobalRole, SubscriptionCadence } from "db"
import sendDailySubscription from "../queues/send-daily-subscription"
import sendWeeklySubscription from "../queues/send-weekly-subscription"
const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)

  const timePeriod = SubscriptionCadence.WEEKLY

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
    if (timePeriod === SubscriptionCadence.WEEKLY) {
      await sendWeeklySubscription.enqueue({})
    } else {
    }
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({}))
  }
}
export default handler
