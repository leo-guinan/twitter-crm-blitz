import { Queue } from "quirrel/next"

import db, { EmailStatus } from "db"
import processEmail from "./process-email"

export default Queue(
  "api/queues/email-offsite-subscription", // 👈 the route it's reachable on
  async (job: { offsiteSubscriberId; collectionId }) => {
    const subscriber = await db.offSiteSubscriber.findFirst({
      where: {
        id: job.offsiteSubscriberId,
      },
    })
    if (!subscriber) {
      throw new Error("Subscriber not found")
    }

    const emailHeader = `Here's a link to your latest collection from Feather.`

    const emailHtmlHeader = `<header>
          <a href="${process.env.QUIRREL_BASE_URL}/tweet-collections/${job.collectionId}">
            ${emailHeader}
          </a>
        </header>`

    //{"collections":[{"id":9,"createdAt":"2021-11-26T18:14:17.785Z","updatedAt":"2021-11-26T18:14:17.788Z","subscriptionId":1,"parentCollectionId":null}]}
    const emailAddress = subscriber.email

    if (emailAddress) {
      const email = await db.email.create({
        data: {
          to: emailAddress,
          from: "leo@feathercrm.io",
          subject: `Your latest collection from Feather`,
          body: `
        ${emailHeader}
        `,
          htmlBody: `
        ${emailHtmlHeader}
        `,
          status: EmailStatus.QUEUED,
        },
      })

      console.log(`Created email: ${email.id}`)
      await processEmail.enqueue({ emailId: email.id })
    }
  },
  { exclusive: true }
)
