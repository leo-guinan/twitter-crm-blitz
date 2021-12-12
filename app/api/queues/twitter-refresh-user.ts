import { Queue } from "quirrel/next"
import db, { Tweet } from "db"
import Twitter from "twitter-lite"

export default Queue(
  "api/queues/twitter-refresh-user", // 👈 the route it's reachable on
  async (job: { twitterId }) => {
    const client = new Twitter({
      subdomain: "api", // "api" is the default (change for other subdomains)
      version: "2", // version "1.1" is the default (change for other subdomains)
      extension: false,
      consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
      bearer_token: process.env.TWITTER_BEARER_TOKEN as string,
    })
    const params = {
      "user.fields": "id,username,profile_image_url,name,description",
    }
    let tweetDBObjects: Tweet[] = []

    await client
      .get(`users/${job.twitterId}`, params)
      .then(async (results) => {
        await db.twitterAccount.upsert({
          where: {
            twitterId: job.twitterId,
          },
          create: {
            twitterId: job.twitterId,
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
      })
      .catch((e) => {
        console.error(e)
      })
  },

  { exclusive: true }
)
