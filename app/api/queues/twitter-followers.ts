//inital load of twitter account data for new user
import { Queue } from "quirrel/next"
import db from "db"
import Twitter from "twitter-lite"
import twitterFollowers from "./twitter-followers"

export default Queue(
  "api/queues/twitter-followers", // 👈 the route it's reachable on
  async (job: { userId; paginationToken }) => {
    console.log("in the queue...populating twitter following data for user: " + job.userId)
    try {
      const user = await db.user.findFirst({
        where: { id: job.userId },
        select: {
          id: true,
          twitterToken: true,
          twitterSecretToken: true,
          twitterId: true,
        },
      })

      console.log(user)

      const client = new Twitter({
        subdomain: "api", // "api" is the default (change for other subdomains)
        version: "2", // version "1.1" is the default (change for other subdomains)
        extension: false,
        consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
        access_token_key: user?.twitterToken as string, // from your User (oauth_token)
        access_token_secret: user?.twitterSecretToken as string, // from your User (oauth_token_secret)
      })

      if (user) {
        console.log("fetching following...")
        console.log("Pagination Token: " + job.paginationToken)
        const params = job.paginationToken
          ? {
              max_results: 1000,
              "user.fields": "description,id,name,username,profile_image_url",
              pagination_token: job.paginationToken,
            }
          : {
              max_results: 1000,
              "user.fields": "description,id,name,username,profile_image_url",
            }
        client
          .get("users/" + user.twitterId + "/followers", params)
          .then(async (results) => {
            console.log(results.meta)
            console.log(Object.getOwnPropertyNames(results))
            results.data.map(async (follower) => {
              // console.log(following)
              await db.twitterUser.upsert({
                where: {
                  twitterId: follower.id,
                },

                update: {},
                create: {
                  name: follower.name,
                  username: follower.username,
                  bio: follower.description,
                  twitterId: follower.id,
                  profilePictureUrl: follower.profile_image_url,
                },
              })
              await db.relationship.upsert({
                where: {
                  userId_twitterUserId: {
                    userId: job.userId,
                    twitterUserId: follower.id,
                  },
                },
                update: {},
                create: {
                  userId: job.userId,
                  twitterUserId: follower.id,
                  type: "follower",
                },
              })
            })

            if (results.meta.next_token) {
              await twitterFollowers.enqueue({
                userId: job.userId,
                paginationToken: results.meta.next_token,
              })
            }
          })
          .catch(console.error)
      }
    } catch (e) {
      console.log("exception processing: " + e)
    }
  }
)
