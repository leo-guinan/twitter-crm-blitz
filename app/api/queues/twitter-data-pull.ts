import { CronJob } from "quirrel/next"
import db, { RelationshipType } from "db"
import Twitter from "twitter-lite"

const fetchFollowers = async (
  access_token_key,
  access_token_secret,
  userId,
  twitterId,
  paginationToken
) => {
  const client = new Twitter({
    subdomain: "api", // "api" is the default (change for other subdomains)
    version: "2", // version "1.1" is the default (change for other subdomains)
    extension: false,
    consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
    access_token_key: access_token_key as string, // from your User (oauth_token)
    access_token_secret: access_token_secret as string, // from your User (oauth_token_secret)
  })
  console.log("fetching followers...")
  const params = paginationToken
    ? {
        max_results: 1000,
        "user.fields": "description,id,name,username,profile_image_url",
        pagination_token: paginationToken,
      }
    : {
        max_results: 1000,
        "user.fields": "description,id,name,username,profile_image_url",
      }
  client.get("users/" + twitterId + "/followers", params).then(async (results) => {
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
          userId_twitterUserId_type: {
            userId: userId,
            twitterUserId: follower.id,
            type: RelationshipType.FOLLOWER,
          },
        },
        update: {},
        create: {
          userId: userId,
          twitterUserId: follower.id,
          type: RelationshipType.FOLLOWER,
        },
      })
    })
    if (results.meta.next_token) {
      //push next token to database
      await db.twitterDataPull.create({
        data: {
          userId,
          relationshipType: RelationshipType.FOLLOWER,
          paginationToken: results.meta.next_token,
        },
      })
    }
  })
}

const fetchFollowing = async (
  access_token_key,
  access_token_secret,
  userId,
  twitterId,
  paginationToken
) => {
  const client = new Twitter({
    subdomain: "api", // "api" is the default (change for other subdomains)
    version: "2", // version "1.1" is the default (change for other subdomains)
    extension: false,
    consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
    access_token_key: access_token_key as string, // from your User (oauth_token)
    access_token_secret: access_token_secret as string, // from your User (oauth_token_secret)
  })
  console.log("fetching following...")
  const params = paginationToken
    ? {
        max_results: 1000,
        "user.fields": "description,id,name,username,profile_image_url",
        pagination_token: paginationToken,
      }
    : {
        max_results: 1000,
        "user.fields": "description,id,name,username,profile_image_url",
      }
  client.get("users/" + twitterId + "/following", params).then(async (results) => {
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
            userId: userId,
            twitterUserId: following.id,
            type: RelationshipType.FOLLOWING,
          },
        },
        update: {},
        create: {
          userId: userId,
          twitterUserId: following.id,
          type: RelationshipType.FOLLOWING,
        },
      })
    })
    if (results.meta.next_token) {
      //push next token to database
      await db.twitterDataPull.create({
        data: {
          userId: userId,
          relationshipType: RelationshipType.FOLLOWING,
          paginationToken: results.meta.next_token,
        },
      })
    }
  })
}

export default CronJob(
  "api/queues/twitter-data-pull", // 👈 the route that it's reachable on
  "0-59/5 * * * *", // every 5 minutes
  async () => {
    const datapulls = await db.twitterDataPull.findMany({
      include: {
        user: true,
      },
    })

    datapulls.forEach(async (datapull) => {
      switch (datapull.relationshipType) {
        case RelationshipType.FOLLOWING:
          await fetchFollowing(
            datapull.user.twitterToken,
            datapull.user.twitterSecretToken,
            datapull.userId,
            datapull.user.twitterId,
            datapull.paginationToken || ""
          )
          break
        case RelationshipType.FOLLOWER:
          await fetchFollowers(
            datapull.user.twitterToken,
            datapull.user.twitterSecretToken,
            datapull.userId,
            datapull.user.twitterId,
            datapull.paginationToken || ""
          )
          break
        default:
          console.log(
            "something is broken. Why are you even here? type: " + datapull.relationshipType
          )
      }
      await db.twitterDataPull.delete({
        where: {
          id: datapull.id,
        },
      })
    })

    const relationships = await db.relationship.groupBy({
      by: ["userId", "twitterUserId"],
      _count: {
        type: true,
      },
      having: {
        type: {
          _count: {
            gt: 1,
          },
        },
      },
    })
    relationships.forEach(async (relationship) => {
      await db.relationship.deleteMany({
        where: {
          userId: relationship.userId,
          twitterUserId: relationship.twitterUserId,
        },
      })
      await db.relationship.create({
        data: {
          userId: relationship.userId,
          twitterUserId: relationship.twitterUserId,
          type: RelationshipType.MUTUAL,
        },
      })
    })
  }
)
