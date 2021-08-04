import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db from "db"
import createFollower from "app/followers/mutations/createFollower"

import Twitter from "twitter-lite"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  const session = await getSession(req, res)
  const user = await db.user.findFirst({
    where: { id: session?.userId ? session.userId : -1 },
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
      .get("followers/list", { count: 2000, skip_status: true, include_user_entities: false })
      .then((results) => {
        console.log(Object.getOwnPropertyNames(results))
        results.users.map(async (follower) => {
          const followerToAdd = {
            name: follower.name,
            username: follower.screen_name,
            bio: follower.description,
            userId: user.id,
          }
          const addedFollower = await createFollower(followerToAdd, { session })
        })
      })
      .catch(console.error)
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ userId: session.userId }))
  } else {
    res.statusCode = 401
    res.end(JSON.stringify({ errorMessage: "User doesn't exist. Can't populate followers." }))
  }
}
export default handler
