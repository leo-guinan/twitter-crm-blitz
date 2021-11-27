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
    const emailHeader = `Hi ${subscription?.owner?.memberships[0]?.user?.name | ""}!

    Here's what ${subscription.twitterUsers[0].name} (@${
      subscription.twitterUsers[0].username
    }) had to say last week.
    `
    const emailHtmlHeader = `<header>${emailHeader}</header>`
    //{"collections":[{"id":9,"createdAt":"2021-11-26T18:14:17.785Z","updatedAt":"2021-11-26T18:14:17.788Z","subscriptionId":1,"parentCollectionId":null}]}
    const tweetStrings = []
    const tweetHTMLStrings = []
    for (const collection of subscription.collections) {
      for (const tweet of collection.tweets) {
        tweetStrings.push(`
          Timestamp: ${tweet.tweetCreatedAt}
          Message:
          ${tweet.message}
        `)
        tweetHTMLStrings.push(`
        <section>
          <span>Timestamp: </span> <span>${tweet.tweetCreatedAt}</span>
          <br />
          <header>Message</header>
          <div>${tweet.message}</div>
        </section>
        `)
      }
    }

    const email = await db.email.create({
      data: {
        to: subscription.owner.memberships[0].user.email,
        from: "leo@feathercrm.io",
        subject: `Tweets from ${subscription.twitterUsers[0].name}`,
        body: `
        ${emailHeader}
        ${tweetStrings.join("\n")}
        `,
        htmlBody: `
        ${emailHtmlHeader}
        ${tweetHTMLStrings.join("\n")}
        `,
        status: EmailStatus.QUEUED,
      },
    })

    console.log(`Created email: ${email.id}`)
  },
  { exclusive: true }
)
