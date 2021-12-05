import { Queue } from "quirrel/next"
import db, { EmailStatus } from "db"
const sgMail = require("@sendgrid/mail")

export default Queue(
  "api/queues/send-email", // 👈 the route it's reachable on
  async (job: {
    to: string
    subject: string
    messageText: string
    messageHTML: string
    emailId: number
  }) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: job.to, // Change to your recipient
      from: "leo@feathercrm.io", // Change to your verified sender
      subject: job.subject,
      text: job.messageText,
      html: job.messageHTML,
    }
    sgMail
      .send(msg)
      .then(async () => {
        console.log("Email sent")
        await db.email.update({
          where: {
            id: job.emailId,
          },
          data: {
            status: EmailStatus.SENT,
          },
        })
      })
      .catch(async (error) => {
        console.error(error)
        await db.email.update({
          where: {
            id: job.emailId,
          },
          data: {
            status: EmailStatus.ERROR,
          },
        })
      })
  },
  { exclusive: true }
)
