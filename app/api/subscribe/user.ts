import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db from "db"
import { nanoid } from "nanoid"
import sendSubscriptionVerification from "../queues/send-subscription-verification"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)
  if (req.body) {
    console.log(req.body)
    const { slug, email } = JSON.parse(req.body)

    const twitterAccount = await db.twitterAccount.findFirst({
      where: {
        slug,
      },
    })

    if (!twitterAccount || !email) {
      res.statusCode = 404
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify({ error: "User not found" }))
    } else {
      const existingSubscriber = await db.offSiteSubscriber.findFirst({
        where: {
          email,
        },
      })

      if (!existingSubscriber) {
        const newSubscriber = await db.offSiteSubscriber.create({
          data: {
            email,
            twitterAccounts: {
              connect: {
                id: twitterAccount.id,
              },
            },
          },
        })
        const securedTokenId = nanoid(32)
        const createdVerification = await db.offSiteSubscribersToVerify.create({
          data: {
            verificationString: securedTokenId,
            offSiteSubscriber: {
              connect: {
                id: newSubscriber.id,
              },
            },
          },
        })

        await sendSubscriptionVerification.enqueue({
          verificationId: createdVerification.id,
        })
      } else {
        if (!existingSubscriber.verified) {
          const verification = await db.offSiteSubscribersToVerify.findFirst({
            where: {
              offSiteSubscriberId: existingSubscriber.id,
            },
          })
          if (!verification) {
            return
          }
          await sendSubscriptionVerification.enqueue({
            verificationId: verification.id,
          })
        } else {
          await db.offSiteSubscriber.update({
            where: {
              id: existingSubscriber.id,
            },
            data: {
              twitterAccounts: {
                connect: {
                  id: twitterAccount.id,
                },
              },
            },
          })
        }
      }

      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify({ userId: session.userId }))
    }
  } else {
    res.statusCode = 404
    res.end()
  }
}
export default handler
