import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db, { RelationshipType, ProcessingStatus } from "db"


const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end()
}
export default handler
