import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db from "db"

// import Amplify, { API, graphqlOperation } from "aws-amplify"
// import { createTwitterAccount } from "src/graphql/mutations"

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

  //step 1: create new organization
  const organization = await db.organization.create({
    data: {
      stripeCustomerId: user.stripeCustomerId,
      price: user.price,
      subscriptionStatus: user.subscriptionStatus,
      subscriptionId: user.subscriptionId,
    },
  })
  //step 2: create new Membership belonging to organization
  const membership = await db.membership.create({
    data: {
      organizationId: organization.id,
      userId: user.id,
    },
  })
  //step 3: create new TwitterAccount belonging to Organization
  const twitterAccount = await db.twitterAccount.create({
    data: {
      twitterToken: user.twitterToken,
      twitterSecretToken: user.twitterSecretToken,
      twitterId: user.twitterId,
      organizationId: organization.id,
    },
  })

  // const result = await API.graphql(
  //   graphqlOperation(createTwitterAccount, { input: twitterAccount })
  // )
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ userId }))
}

export default handler
