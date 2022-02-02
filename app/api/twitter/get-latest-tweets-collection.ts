import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db, { Tweet } from "../../../db"
import { formatISO, subDays } from "date-fns"
import Twitter from "twitter-lite"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)
  const userId = session.userId
  const orgId = session.orgId

  if (req.body) {
    const { twitterAccountId } = JSON.parse(req.body)

    const twitterAccount = await db.twitterAccount.findFirst({
      where: { id: twitterAccountId },
    })

    const client = new Twitter({
      subdomain: "api", // "api" is the default (change for other subdomains)
      version: "2", // version "1.1" is the default (change for other subdomains)
      extension: false,
      consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
      bearer_token: process.env.TWITTER_BEARER_TOKEN as string,
    })

    if (!twitterAccount) {
      res.statusCode = 404
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify({ message: "No account requested" }))
    } else {
      const twitterAccountQueryString = `(from: ${twitterAccount.twitterUsername})
       -is:reply -is:retweet -is:quote`
      const startTime = subDays(new Date(), 7)

      const params = {
        query: twitterAccountQueryString,
        max_results: 100,
        "tweet.fields": "public_metrics,entities,created_at,author_id",
        "user.fields": "entities,profile_image_url,name,description",
        start_time: formatISO(startTime),
      }

      let tweetDBObjects: Tweet[] = []

      await client.get("tweets/search/recent", params).then(async (results) => {
        if (results.data) {
          for (const tweet of results.data) {
            let savedTweet = await db.tweet.upsert({
              where: {
                tweetId: tweet.id,
              },
              create: {
                tweetId: tweet.id,
                message: tweet.text,
                tweetCreatedAt: tweet.created_at,
                authorAccount: {
                  connect: {
                    twitterId: tweet.author_id,
                  },
                },
              },
              update: {
                authorAccount: {
                  connect: {
                    twitterId: tweet.author_id,
                  },
                },
              },
            })
            tweetDBObjects.push(savedTweet)
          }
          const collectedTweets = tweetDBObjects.map((dbo) => {
            return {
              tweetId: dbo.tweetId,
            }
          })
          const twitterCollection = await db.tweetCollection.create({
            data: {
              tweets: {
                connect: [...collectedTweets],
              },
            },
          })

          res.statusCode = 200
          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify({ ...twitterCollection }))
        }
      })
    }
  } else {
    res.statusCode = 404
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ message: "No account requested" }))
  }
}

export default handler
