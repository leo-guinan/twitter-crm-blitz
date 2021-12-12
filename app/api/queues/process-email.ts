import { Queue } from "quirrel/next"
import db, { EmailStatus } from "db"
import sendEmail from "./send-email"
const sgMail = require("@sendgrid/mail")

export default Queue(
  "api/queues/process-email",
  async (job: { emailId }) => {
    const email = await db.email.findFirst({
      where: {
        id: job.emailId,
        status: EmailStatus.QUEUED,
      },
    })
    if (email) {
      console.log(JSON.stringify(email))

      await sendEmail.enqueue({
        to: email.to,
        subject: email.subject,
        messageText: email.body,
        messageHTML: email.htmlBody,
        emailId: email.id,
      })
      await db.email.update({
        where: {
          id: email.id,
        },
        data: {
          status: EmailStatus.PROCESSING,
        },
      })
    } else {
      console.log("No email to send")
    }
  },

  { exclusive: true }
)
