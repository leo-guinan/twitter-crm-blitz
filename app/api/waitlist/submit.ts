import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db from "db"
import ConvertKit from "convertkit-node"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)
  const { email } = JSON.parse(req.body)
  console.log(email)

  try {
    const saved_email = await db.emailWaitlist.upsert({
      where: {
        email,
      },
      create: {
        email,
      },
      update: {},
    })
    const ck = new ConvertKit({
      apiKey: process.env.CONVERTKIT_API_KEY as string,
      apiSecret: process.env.CONVERTKIT_API_SECRET as string,
    })
    ck.addSubscriber({
      email,
      formId: 2612289,
      tags: [],
    })
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.end("Error adding user")
  }
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ userId: session.userId }))
}
export default handler
