import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import fixTweetLookupErrors from "../queues/fix-tweet-lookup-errors"
const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  await fixTweetLookupErrors.enqueue({})
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({}))
}
export default handler
