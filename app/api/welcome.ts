import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)

  if (req.body) {
    const { email } = JSON.parse(req.body)
  }

  // save email
  // send personal subscription from me
  // send community subscription (spark)
  // send engagement email

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ userId: session.userId }))
}
export default handler
