import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db from "db"
import createFollower from "app/followers/mutations/createFollower"

import Twitter from "twitter-lite"
import createDirectMessage from "app/direct-messages/mutations/createDirectMessage"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  const session = await getSession(req, res)
  const user = await db.user.findFirst({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      twitterUsername: true,
      twitterToken: true,
      twitterSecretToken: true,
    },
  })

  if (user) {
    const client = new Twitter({
      subdomain: "api", // "api" is the default (change for other subdomains)
      version: "1.1", // version "1.1" is the default (change for other subdomains)
      consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
      access_token_key: user?.twitterToken as string, // from your User (oauth_token)
      access_token_secret: user?.twitterSecretToken as string, // from your User (oauth_token_secret)
    })

    let followers = []

    client
      .get("direct_messages/events/list", { count: 50 })
      .then((results) => {
        console.log(Object.getOwnPropertyNames(results))
        results.events.map(async (directMessage) => {
          console.log(directMessage)
          // const directMessageToAdd = {
          //   message: "to",
          //   to: "",
          //   userId: user.id
          // }
          // await createDirectMessage(directMessageToAdd, { session })
        })
      })
      .catch(console.error)
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ userId: session.userId }))
  } else {
    res.statusCode = 401
    res.end(JSON.stringify({ errorMessage: "User doesn't exist. Can't populate direct messages." }))
  }
}
export default handler
