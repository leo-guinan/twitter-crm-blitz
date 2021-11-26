import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db, { EmailStatus } from "db"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)
  const { twitterAccountId } = req.body

  const email = await db.email.create({
    data: {
      to: "leo.guinan@gmail.com",
      from: "leo@feathercrm.io",
      subject: "Tweets from <Insert Name Here>",
      body: "Tweet 1\n\nTimestamp",
      htmlBody: "<section style='color:blue;'>Tweet 1\n\nTimestamp</section>",
      status: EmailStatus.QUEUED,
    },
  })

  console.log(JSON.stringify(email))
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ userId: session.userId }))
}
export default handler
