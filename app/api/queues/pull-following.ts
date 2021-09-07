//inital load of twitter account data for new user
import { Queue } from "quirrel/next"
import db, { RelationshipType, ProcessingStatus } from "db"
import Twitter from "twitter-lite"
import twitterFollowers from "./twitter-followers"
import { add } from "date-fns"

export default Queue(
  "api/queues/pull-following", // 👈 the route it's reachable on
  async (job: {
    access_token_key
    access_token_secret
    twitterId
    twitterAccountId
    paginationToken
  }) => {
    const client = new Twitter({
      subdomain: "api", // "api" is the default (change for other subdomains)
      version: "2", // version "1.1" is the default (change for other subdomains)
      extension: false,
      consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
      access_token_key: job.access_token_key as string, // from your User (oauth_token)
      access_token_secret: job.access_token_secret as string, // from your User (oauth_token_secret)
    })
    if (!job.paginationToken) {
      await db.twitterAccountStatus.update({
        where: {
          twitterAccountId_relationshipType: {
            twitterAccountId: job.twitterAccountId,
            relationshipType: RelationshipType.FOLLOWING,
          },
        },
        data: {
          status: ProcessingStatus.PROCESSING,
        },
      })
    }
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
    client.get("users/" + job.twitterId + "/following", params).then(async (results) => {
      results.data.map(async (following) => {
        // console.log(following)
        await db.twitterUser.upsert({
          where: {
            twitterId: following.id,
          },

          update: {
            name: following.name,
            username: following.username,
            bio: following.description,
            twitterId: following.id,
            profilePictureUrl: following.profile_image_url,
          },
          create: {
            name: following.name,
            username: following.username,
            bio: following.description,
            twitterId: following.id,
            profilePictureUrl: following.profile_image_url,
          },
        })
        await db.relationshipStaging.upsert({
          where: {
            twitterAccountId_twitterUserId_type: {
              twitterAccountId: job.twitterAccountId,
              twitterUserId: following.id,
              type: RelationshipType.FOLLOWING,
            },
          },
          update: {},
          create: {
            type: RelationshipType.FOLLOWING,
            twitterAccountId: job.twitterAccountId,
            twitterUserId: following.id,
          },
        })
      })
      if (results.meta.next_token) {
        //push next token to database
        await db.twitterDataPull.create({
          data: {
            twitterAccountId: job.twitterAccountId,
            relationshipType: RelationshipType.FOLLOWING,
            paginationToken: results.meta.next_token,
          },
        })
        await db.twitterAccountStatus.update({
          where: {
            twitterAccountId_relationshipType: {
              twitterAccountId: job.twitterAccountId,
              relationshipType: RelationshipType.FOLLOWING,
            },
          },
          data: {
            paginationToken: results.meta.next_token,
          },
        })
      } else {
        //mark data pull as complete
        await db.twitterAccountStatusHistorical.create({
          data: {
            twitterAccountId: job.twitterAccountId,
            relationshipType: RelationshipType.FOLLOWING,
            status: ProcessingStatus.COMPLETE,
          },
        })
        await db.twitterAccountStatus.delete({
          where: {
            twitterAccountId_relationshipType: {
              twitterAccountId: job.twitterAccountId,
              relationshipType: RelationshipType.FOLLOWING,
            },
          },
        })
      }
    })
  },
  { exclusive: true }
)
