import { Queue } from "quirrel/next"
import Twitter from "twitter-lite"

import db, { EmailStatus, SubscriptionCadence, Tweet } from "db"

export default Queue(
  "api/queues/email-collection", // 👈 the route it's reachable on
  async (job: { subscriptionId; collectionId }) => {
    const subscription = await db.subscription.findFirst({
      where: {
        id: job.subscriptionId,
      },
      select: {
        collections: {
          where: {
            id: job.collectionId,
          },
          select: {
            tweets: true,
          },
        },
        owner: {
          select: {
            memberships: {
              select: {
                user: {
                  select: {
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        twitterUsers: {
          select: {
            name: true,
            username: true,
          },
        },
      },
    })
    const nameOfUserSubscribedTo = subscription?.twitterUsers[0]?.name
    if (subscription) {
      const emailHeader = `Here's a link to your latest collection for ${nameOfUserSubscribedTo}: ${process.env.QUIRREL_BASE_URL}/tweet-collection/${job.collectionId}`

      const emailHtmlHeader = `
        <header>
          Here's a link to your latest collection for ${nameOfUserSubscribedTo}:
          <a href="${process.env.QUIRREL_BASE_URL}/tweet-collections/${job.collectionId}">
            here.
          </a>
        </header>`
      //{"collections":[{"id":9,"createdAt":"2021-11-26T18:14:17.785Z","updatedAt":"2021-11-26T18:14:17.788Z","subscriptionId":1,"parentCollectionId":null}]}
      const emailAddress = subscription?.owner?.memberships[0]?.user?.email

      if (emailAddress) {
        const email = await db.email.create({
          data: {
            to: emailAddress,
            from: "leo@feathercrm.io",
            subject: `Tweets from ${nameOfUserSubscribedTo}`,
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
      }
    }
  },
  { exclusive: true }
)
