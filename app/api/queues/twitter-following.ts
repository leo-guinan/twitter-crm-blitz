//inital load of twitter account data for new user
import { Queue } from "quirrel/next"
import db from "db"
import Twitter from "twitter-lite"
import twitterFollowing from "./twitter-following"

export default Queue(
  "api/queues/twitter-following", // 👈 the route it's reachable on
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
          .get("users/" + user.twitterId + "/following", params)
          .then(async (results) => {
            console.log(results.meta)
            console.log(Object.getOwnPropertyNames(results))
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
                  userId_twitterUserId: {
                    userId: job.userId,
                    twitterUserId: following.id,
                  },
                },
                update: {},
                create: {
                  userId: job.userId,
                  twitterUserId: following.id,
                  type: "following",
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
          .catch(console.error)
      }
      // //get the users following the logged in user
      // while (!done) {
      //   const params = paginationToken
      //     ? {
      //         max_results: 1000,
      //         "user.fields": "description,id,name,username,profile_image_url",
      //         pagination_token: paginationToken,
      //       }
      //     : {
      //         max_results: 1000,
      //         "user.fields": "description,id,name,username,profile_image_url",
      //       }
      //   client
      //     .get("users/" + user.twitterId + "/followers", params)
      //     .then((results) => {
      //       console.log(Object.getOwnPropertyNames(results))
      //       results.data.map(async (follower) => {
      //         await db.twitterUser.create({
      //           data: {
      //             name: follower.name,
      //             username: follower.screen_name,
      //             bio: follower.description,
      //             twitterId: follower.id,
      //             profilePictureUrl: follower.profile_image_url,
      //           },
      //         })
      //         await db.relationship.create({
      //           data: {
      //             userId: job.userId,
      //             twitterUserId: follower.id,
      //             type: "follower",
      //           },
      //         })
      //       })
      //       if (results.meta.next_token) {
      //         paginationToken = results.meta.next_token
      //       } else {
      //         done = true
      //       }
      //     })
      //     .catch(console.error)
      // }

      // console.log("processing mutuals...")

      //determine which relations are mutuals
      // Object.keys(following).forEach(async (key) => {
      //   if (followers[key]) {
      //     mutuals[key] = followers[key]
      //     delete followers[key]
      //     delete following[key]
      //   } else {
      //     const follow = following[key]
      //     await db.twitterUser.create({
      //       data: {
      //         name: follow.name,
      //         username: follow.username,
      //         bio: follow.bio,
      //         twitterId: key,
      //         profilePictureUrl: follow.profile_image_url,
      //       },
      //     })
      //     await db.relationship.create({
      //       data: {
      //         userId: job.userId,
      //         twitterUserId: key,
      //         type: "followed",
      //       },
      //     })
      //   }
      // })

      // Object.keys(followers).forEach(async (key) => {
      //   const follow = followers[key]
      //   await db.twitterUser.create({
      //     data: {
      //       name: follow.name,
      //       username: follow.username,
      //       bio: follow.bio,
      //       twitterId: key,
      //       profilePictureUrl: follow.profile_image_url,
      //     },
      //   })
      //   await db.relationship.create({
      //     data: {
      //       userId: job.userId,
      //       twitterUserId: key,
      //       type: "follower",
      //     },
      //   })
      // })

      // Object.keys(mutuals).forEach(async (key) => {
      //   const follow = followers[key]
      //   await db.twitterUser.create({
      //     data: {
      //       name: follow.name,
      //       username: follow.username,
      //       bio: follow.bio,
      //       twitterId: key,
      //       profilePictureUrl: follow.profile_image_url,
      //     },
      //   })
      //   await db.relationship.create({
      //     data: {
      //       userId: job.userId,
      //       twitterUserId: key,
      //       type: "mutual",
      //     },
      //   })
      // })
    } catch (e) {
      console.log("exception processing: " + e)
    }
  }
)
