import Twitter from "twitter-lite"
import db, { Tweet } from "../../../db"
import { formatISO, subDays } from "date-fns"
import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import { getEngagement } from "../../util/twitter/engagement"
import { refreshUser } from "../../util/twitter/populate-user"
import processTwitterAccount from "../queues/process-twitter-account"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  if (req.body) {
    const { twitterAccountTwitterId } = JSON.parse(req.body)
    await processTwitterAccount.enqueue({
      twitterAccountTwitterId,
    })

    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ success: true }))
  }
}

export default handler
