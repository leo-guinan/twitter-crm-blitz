import { Queue } from "quirrel/next"
import Twitter from "twitter-lite"
import db, { TweetLookupStatus } from "db"

export default Queue(
  "api/queues/twitter-likes", // 👈 the route it's reachable on
  async (job: { tweetId; twitterAccountTwitterId; reportId }) => {
    let client
    const authenticatedUser = await db.twitterAccount.findFirst({
      where: {
        twitterId: job.twitterAccountTwitterId,
      },
    })
    if (authenticatedUser && authenticatedUser.twitterToken) {
      client = new Twitter({
        subdomain: "api", // "api" is the default (change for other subdomains)
        version: "2", // version "1.1" is the default (change for other subdomains)
        extension: false,
        consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
        access_token_key: authenticatedUser.twitterToken as string, // from your User (oauth_token)
        access_token_secret: authenticatedUser.twitterSecretToken as string, // from your User (oauth_token_secret)
      })
      console.log("Using authenticated user")
    } else {
      client = new Twitter({
        subdomain: "api", // "api" is the default (change for other subdomains)
        version: "2", // version "1.1" is the default (change for other subdomains)
        extension: false,
        consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
        bearer_token: process.env.TWITTER_BEARER_TOKEN as string,
      })
      console.log("Using bearer token instead")
    }

    const params = {
      "user.fields": "id,name,username,profile_image_url",
    }
    client
      .get("tweets/" + job.tweetId + "/liking_users", params)
      .then(async (results) => {
        if (results && results.data) {
          results.data.map(async (user) => {
            await db.tweet.update({
              where: {
                tweetId: job.tweetId,
              },
              data: {
                likes: {
                  connectOrCreate: {
                    where: {
                      twitterId: user.id,
                    },
                    create: {
                      twitterId: user.id,
                      twitterName: user.name,
                      twitterUsername: user.username,
                      twitterProfilePictureUrl: user.profile_image_url,
                    },
                  },
                },
              },
            })
          })
        }
      })
      .catch(async (e) => {
        await db.tweetLookupReport.update({
          where: {
            id: job.reportId,
          },
          data: {
            tweetLookupStatus: TweetLookupStatus.ERROR,
            errorMessage: e.message,
          },
        })
        if ("errors" in e) {
          console.log("This should be where the rate error ends up")
          // Twitter API error
          if (e.errors[0].code === 88) {
            // rate limit exceeded
            console.log(
              "Rate limit will reset on",
              new Date(e._headers.get("x-rate-limit-reset") * 1000)
            )
          } else {
            console.error(e)
          }
        } else {
          console.error(e)
        }
      })
  },
  {
    exclusive: true,
  }
)
