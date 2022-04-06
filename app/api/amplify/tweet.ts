import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db, { EmailStatus } from "db"
import processEmail from "../queues/process-email"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)

  const { tweetId } = JSON.parse(req.body)

  if (!session.userId) {
    res.statusCode = 401
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify("Unauthorized"))
  } else {
    // currentUser?.memberships[0]?.organization?.twitterAccounts[0]?
    const user = await db.user.findFirst({
      where: { id: session.userId },
      select: {
        memberships: {
          select: {
            organization: {
              select: {
                twitterAccounts: true,
              },
            },
          },
        },
      },
    })

    const twitterAccountToAmplify = user?.memberships[0]?.organization?.twitterAccounts[0]
    console.log(twitterAccountToAmplify)

    if (twitterAccountToAmplify) {
      const amplifiers = await db.amplifier.findMany({
        where: {
          ownerId: twitterAccountToAmplify.id,
        },
      })

      for (const amplifier of amplifiers) {
        const orgToAmplify = await db.organization.findFirst({
          where: {
            twitterAccounts: {
              some: {
                id: amplifier.amplifiedAccountId,
              },
            },
          },
          select: {
            twitterAccounts: true,
            memberships: {
              select: {
                user: true,
              },
            },
          },
        })
        const user = orgToAmplify?.memberships[0]?.user
        const nameOfUserToAmplify = orgToAmplify?.twitterAccounts[0]?.twitterName
        const emailHeader = `${nameOfUserToAmplify} needs your help to amplify their tweet: ${process.env.QUIRREL_BASE_URL}/tools/amplify/${tweetId}`

        const emailHtmlHeader = `
        <header>
          Help ${nameOfUserToAmplify} amplify their tweet:
          <a href="${process.env.QUIRREL_BASE_URL}/tools/amplify/${tweetId}">
            here.
          </a>
        </header>`
        //{"collections":[{"id":9,"createdAt":"2021-11-26T18:14:17.785Z","updatedAt":"2021-11-26T18:14:17.788Z","subscriptionId":1,"parentCollectionId":null}]}
        const emailAddress = orgToAmplify?.memberships[0]?.user?.email

        if (emailAddress) {
          const email = await db.email.create({
            data: {
              to: emailAddress,
              from: "leo@feathercrm.io",
              subject: `Amplification Request from ${nameOfUserToAmplify}`,
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
      }

      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify({}))
    }
  }
}
export default handler
