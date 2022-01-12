import { Queue } from "quirrel/next"
import db, { EmailStatus } from "../../../db"
import rescheduler from "./rescheduler"
import Twitter from "twitter-lite"
import processEmail from "./process-email"

export default Queue(
  "api/queues/twitter-route-dms", // 👈 the route it's reachable on
  async (job: { twitterId; userId }) => {
    const authenticatedUser = await db.twitterAccount.findFirst({
      where: {
        twitterId: job.twitterId,
      },
    })
    const currentUser = await db.user.findFirst({
      where: {
        id: job.userId,
      },
    })
    const emailAddress = currentUser?.email
    if (authenticatedUser && authenticatedUser.rateLimited) {
      await rescheduler.enqueue({ type: "dms", payload: job })
    }
    if (authenticatedUser) {
      const client = new Twitter({
        subdomain: "api", // "api" is the default (change for other subdomains)
        version: "1.1", // version "1.1" is the default (change for other subdomains)
        consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
        access_token_key: authenticatedUser.twitterToken as string, // from your User (oauth_token)
        access_token_secret: authenticatedUser.twitterSecretToken as string, // from your User (oauth_token_secret)
      })

      const params = {
        count: 50,
      }
      client
        .get("direct_messages/events/list", params)
        .then(async (results) => {
          if (results && results.events) {
            for (const event of results.events) {
              const messageText = event.message_create.message_data.text
              const senderId = event.message_create.sender_id
              const recipientId = event.message_create.target.recipient_id
              const created = new Date(parseInt(event.created_timestamp)).toISOString()
              const messageId = event.id
              const message = await db.directMessageEvent.findFirst({
                where: {
                  twitterDMId: event.id,
                },
              })
              if (!message) {
                await db.directMessageEvent.create({
                  data: {
                    twitterDMId: messageId,
                    sendingAccount: {
                      connectOrCreate: {
                        where: {
                          twitterId: senderId,
                        },
                        create: {
                          twitterId: senderId,
                        },
                      },
                    },
                    receivingAccount: {
                      connectOrCreate: {
                        where: {
                          twitterId: recipientId,
                        },
                        create: {
                          twitterId: recipientId,
                        },
                      },
                    },
                    messageTimestamp: created,
                  },
                })

                if (emailAddress) {
                  if (job.twitterId === senderId) {
                    const recipient = await db.twitterAccount.findFirst({
                      where: {
                        twitterId: recipientId,
                      },
                    })

                    //user sent this message
                    if (recipient) {
                      const email = await db.email.create({
                        data: {
                          to: emailAddress,
                          from: "leo@feathercrm.io",
                          subject: `New Direct Message Sent To ${recipient.twitterUsername}`,
                          body: `${messageText}`,
                          htmlBody: `${messageText}`,
                          status: EmailStatus.QUEUED,
                        },
                      })
                      await processEmail.enqueue({ emailId: email.id })
                    }
                  } else if (job.twitterId === recipientId) {
                    const sender = await db.twitterAccount.findFirst({
                      where: {
                        twitterId: senderId,
                      },
                    })
                    //user received this message
                    if (sender) {
                      const email = await db.email.create({
                        data: {
                          to: emailAddress,
                          from: "leo@feathercrm.io",
                          subject: `New Direct Message Received From ${sender.twitterUsername}`,
                          body: `${messageText}`,
                          htmlBody: `${messageText}`,
                          status: EmailStatus.QUEUED,
                        },
                      })
                      await processEmail.enqueue({ emailId: email.id })
                    }
                  } else {
                    console.error(
                      "Should not reach this branch. Account should be sender or recipient"
                    )
                  }
                }
              }
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  {}
)
