import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db from "db"
//

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")

  const session = await getSession(req, res)

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ userId: session.userId }))
}
export default handler
