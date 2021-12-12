import { CronJob } from "quirrel/next"
import db, { EmailStatus } from "db"
import sendEmail from "./send-email"

export default CronJob(
  "api/queues/process-emails", // 👈 the route that it's reachable on
  "0 0 * * 0", // once a week for now
  async () => {
    const emails = await db.email.findMany({
      where: {
        status: EmailStatus.QUEUED,
      },
    })
    for (let email of emails) {
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
    }
  }
)
