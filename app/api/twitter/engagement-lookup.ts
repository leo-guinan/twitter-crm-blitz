import Twitter from "twitter-lite"
import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import { getEngagement } from "../../util/twitter/engagement"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)
  const userId = session.userId
  const orgId = session.orgId

  if (req.body) {
    const { twitterId } = JSON.parse(req.body)

    const client = new Twitter({
      subdomain: "api", // "api" is the default (change for other subdomains)
      version: "2", // version "1.1" is the default (change for other subdomains)
      extension: false,
      consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
      bearer_token: process.env.TWITTER_BEARER_TOKEN as string,
    })

    await getEngagement(client, twitterId)

    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ success: true }))
  }
}

export default handler
