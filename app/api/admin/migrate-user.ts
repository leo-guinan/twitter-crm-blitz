import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db from "db"

import Amplify, { API, graphqlOperation } from "aws-amplify"
import { createTwitterAccount } from "src/graphql/mutations"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  const { userId } = JSON.parse(req.body)
  console.log("migrating user " + userId)

  const user = await db.user.findFirst({
    where: { id: userId },
    select: {
      id: true,
      twitterToken: true,
      twitterSecretToken: true,
      twitterId: true,
      trial: true,
      subscriptionStatus: true,
      price: true,
      subscriptionId: true,
    },
  })
  const twitterAccount = {
    userId: userId,
    twitterToken: user?.twitterToken,
    twitterSecretToken: user?.twitterSecretToken,
    twitterUserId: user?.twitterId,
  }
  const result = await API.graphql(
    graphqlOperation(createTwitterAccount, { input: twitterAccount })
  )
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ userId }))
}

export default handler
