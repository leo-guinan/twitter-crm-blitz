import db, { EmailStatus } from "../../../db"
import processEmail from "../../api/queues/process-email"

export const emailTwitterCollection = async (collection, emailAddress, header) => {
  const emailHtmlHeader = `
        <header>
          ${header}}
          <a href="${process.env.QUIRREL_BASE_URL}/tweet-collections/${collection}">
            here.
          </a>
        </header>`

  const email = await db.email.create({
    data: {
      to: emailAddress,
      from: "leo@feathercrm.io",
      subject: header,
      body: `
        ${header}
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
