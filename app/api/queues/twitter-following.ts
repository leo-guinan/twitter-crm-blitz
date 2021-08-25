//inital load of twitter account data for new user
import { Queue } from "quirrel/next"
import db, { RelationshipType } from "db"
import Twitter from "twitter-lite"
import twitterFollowing from "./twitter-following"
import { add } from "date-fns"

export default Queue(
  "api/queues/twitter-following", // 👈 the route it's reachable on
  async (job: { userId; paginationToken }) => {
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

        const params = job.paginationToken
          ? {
              max_results: 250,
              "user.fields": "description,id,name,username,profile_image_url",
              pagination_token: job.paginationToken,
            }
          : {
              max_results: 250,
              "user.fields": "description,id,name,username,profile_image_url",
            }
        console.log("connecting with url: users/" + user.twitterId + "/following")
        console.log("parameters: " + params)
        client
          .get("users/" + user.twitterId + "/following", params)
          .then(async (results) => {
            results.data.map(async (following) => {
              // console.log(following)
              await db.twitterUser.upsert({
                where: {
                  twitterId: following.id,
                },

                update: {},
                create: {
                  name: following.name,
                  username: following.username,
                  bio: following.description,
                  twitterId: following.id,
                  profilePictureUrl: following.profile_image_url,
                },
              })
              await db.relationship.upsert({
                where: {
                  userId_twitterUserId_type: {
                    userId: job.userId,
                    twitterUserId: following.id,
                    type: RelationshipType.FOLLOWING,
                  },
                },
                update: {},
                create: {
                  userId: job.userId,
                  twitterUserId: following.id,
                  type: RelationshipType.FOLLOWING,
                },
              })
            })

            if (results.meta.next_token) {
              await twitterFollowing.enqueue({
                userId: job.userId,
                paginationToken: results.meta.next_token,
              })
            }
          })
          .catch(async (error) => {
            console.error(error)
            await twitterFollowing.enqueue(
              {
                userId: job.userId,
                paginationToken: job.paginationToken,
              },
              {
                runAt: add(new Date(), { minutes: 30 }),
                id: job.userId + "_" + job.paginationToken,
              }
            )
          })
      }
    } catch (e) {
      console.log("exception processing: " + e)
    }
  }
)
