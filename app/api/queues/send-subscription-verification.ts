import { Queue } from "quirrel/next"
import db, { EmailStatus } from "db"
import sendEmail from "./send-email"
import { nanoid } from "nanoid"
export default Queue(
  "api/queues/send-subscription-verification", // 👈 the route it's reachable on
  async ({ verificationId }) => {
    const verification = await db.offSiteSubscribersToVerify.findFirst({
      where: {
        id: verificationId,
      },
      include: {
        offSiteSubscriber: true,
      },
    })
    if (!verification) {
      return
    }
    const emailRecord = await db.email.create({
      data: {
        to: verification.offSiteSubscriber.email,
        from: "leo@feathercrm.io",
        subject: "Feather: Verify Your Email",
        body: `Please visit this URL to verify your email: https://localhost:3000/profile/verify/${verification.verificationString}`,
        htmlBody: `<a href="${process.env.QUIRREL_BASE_URL}/profile/verify/${verification.verificationString}">Click here to verify your email</a>`,
        status: EmailStatus.QUEUED,
      },
    })
    await sendEmail.enqueue({
      to: verification.offSiteSubscriber.email,
      subject: emailRecord.subject,
      messageText: emailRecord.body,
      messageHTML: emailRecord.htmlBody,
      emailId: emailRecord.id,
    })
  },
  {}
)
