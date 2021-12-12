import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db, { SubscriptionType } from "db"
import Twitter from "twitter-lite"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)

  const subscriptions = await db.subscription.findMany({
    select: {
      id: true,
      twitterUsers: true,
      ownerId: true,
    },
  })

  for (const subscription of subscriptions) {
    //for users in subsscription
    for (const user of subscription.twitterUsers) {
      let twitterAccount = await db.twitterAccount.findFirst({
        where: {
          twitterId: user.twitterId,
        },
      })
      if (!twitterAccount) {
        twitterAccount = await db.twitterAccount.create({
          data: {
            twitterId: user.twitterId,
            twitterName: user.name,
            twitterUsername: user.username,
            twitterProfilePictureUrl: user.profilePictureUrl,
          },
        })
        console.log("Created twitter account: ", twitterAccount.id)
      }

      const subscriptionsToAccount = await db.twitterAccountsInSubscriptions.findMany({
        where: {
          twitterAccount: twitterAccount,
        },
        select: {
          subscription: {
            select: {
              ownerId: true,
            },
          },
        },
      })

      if (
        subscriptionsToAccount.filter((sub) => sub.subscription.ownerId === subscription.ownerId)
          .length === 0
      ) {
        await db.twitterAccountsInSubscriptions.create({
          data: {
            type: SubscriptionType.PERSONAL,
            twitterAccount: {
              connect: {
                id: twitterAccount.id,
              },
            },
            subscription: {
              connect: {
                id: subscription.id,
              },
            },
          },
        })
        console.log("Created subscription to account: ", twitterAccount.id)
      } else {
        console.log("Already subscribed to account: ", twitterAccount.id)
      }
    }
  }

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({}))
}
export default handler
