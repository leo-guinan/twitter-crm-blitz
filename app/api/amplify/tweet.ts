import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db, { EmailStatus } from "db"
import processEmail from "../queues/process-email"
import createBoostRecord from "../queues/create-boost-record"
const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)

  const { tweetId } = JSON.parse(req.body)

  if (!session.userId) {
    res.statusCode = 401
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify("Unauthorized"))
  } else {
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

    if (twitterAccountToAmplify) {
      const amplifiers = await db.amplifier.findMany({
        where: {
          amplifiedAccountId: twitterAccountToAmplify.id,
        },
      })

      await db.boostRequestRecord.updateMany({
        where: {
          requestedTwitterAccountId: twitterAccountToAmplify.id,
          boostedTweetId: tweetId,
        },
        data: {
          amplified: true,
        },
      })

      for (const amplifier of amplifiers) {
        const amplifyingOrg = await db.organization.findFirst({
          where: {
            twitterAccounts: {
              some: {
                id: amplifier.ownerId,
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
        await createBoostRecord.enqueue({
          tweetId,
          requestingAccountId: twitterAccountToAmplify.id,
          requestedAccountId: amplifyingOrg?.twitterAccounts[0]?.id,
        })
        const nameOfUserToAmplify = amplifyingOrg?.twitterAccounts[0]?.twitterName
        const emailHeader = `${nameOfUserToAmplify} needs your help to amplify their tweet: ${process.env.QUIRREL_BASE_URL}/tools/amplify/${tweetId}`

        const emailHtmlHeader = `
        <header>
          Help ${nameOfUserToAmplify} amplify their tweet:
          <a href="${process.env.QUIRREL_BASE_URL}/tools/amplify/${tweetId}">
            here.
          </a>
        </header>`
        const emailAddress = amplifyingOrg?.memberships[0]?.user?.email

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
