import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import twitterSubscribeToUser from "app/api/queues/twitter-subscribe-to-user"
import db, { Tweet } from "db"
import Twitter from "twitter-lite"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const session = await getSession(req, res)
  const userId = session.userId
  const orgId = session.orgId
  if (req.body) {
    const { twitterAccountUrl } = JSON.parse(req.body)
    const organization = await db.organization.findUnique({
      where: {
        id: orgId,
      },
      include: {
        twitterAccounts: true,
      },
    })

    const twitterAccount = organization!.twitterAccounts[0]

    const twitterAccountId = twitterAccount!.twitterId

    try {
      const twitterUrl = new URL(twitterAccountUrl)
      console.log(JSON.stringify(twitterAccountUrl))
      if (twitterUrl.host === "twitter.com") {
        //first, see if we have this user's profile in the db already. Then no need for api lookup.

        const localTwitterUser = await db.twitterAccount.findFirst({
          where: {
            twitterUsername: {
              equals: twitterUrl.pathname.split("/")[1],
              mode: "insensitive",
            },
          },
        })
        if (localTwitterUser) {
          res.statusCode = 200
          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify({ ...localTwitterUser }))
        } else {
          const client = new Twitter({
            subdomain: "api", // "api" is the default (change for other subdomains)
            version: "2", // version "1.1" is the default (change for other subdomains)
            extension: false,
            consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
            bearer_token: process.env.TWITTER_BEARER_TOKEN as string,
          })

          const params = {
            "user.fields": "id,profile_image_url,name,description",
          }

          await client
            .get(`users/by/username${twitterUrl.pathname}`, params)
            .then(async (results) => {
              console.log(JSON.stringify(results.data))
              const lookedupUser = await db.twitterAccount.upsert({
                where: {
                  twitterId: results.data.id,
                },
                create: {
                  twitterId: results.data.id,
                  twitterUsername: results.data.username,
                  twitterName: results.data.name,
                  twitterBio: results.data.description,
                  twitterProfilePictureUrl: results.data.profile_image_url,
                },
                update: {
                  twitterUsername: results.data.username,
                  twitterName: results.data.name,
                  twitterBio: results.data.description,
                  twitterProfilePictureUrl: results.data.profile_image_url,
                },
              })
              res.statusCode = 200
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify({ ...lookedupUser }))
            })
        }
      }
    } catch (e) {
      res.statusCode = 500
      console.error(e)
      res.end()
    }
  }
}
export default handler
