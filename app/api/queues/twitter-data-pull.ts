import { CronJob } from "quirrel/next"
import db, { RelationshipType } from "db"
import Twitter from "twitter-lite"
import twitterPullFollower from "app/api/queues/pull-follower"
import twitterPullFollowing from "app/api/queues/pull-following"

export default CronJob(
  "api/queues/twitter-data-pull", // 👈 the route that it's reachable on
  "0-59/5 * * * *", // every 5 minutes
  async () => {
    const datapulls = await db.twitterDataPull.findMany({
      include: {
        twitterAccount: true,
      },
    })
    for (const datapull of datapulls) {
      switch (datapull.relationshipType) {
        case RelationshipType.FOLLOWING:
          twitterPullFollowing.enqueue({
            access_token_key: datapull!.twitterAccount!.twitterToken,
            access_token_secret: datapull!.twitterAccount!.twitterSecretToken,
            twitterId: datapull!.twitterAccount!.twitterId,
            twitterAccountId: datapull!.twitterAccount!.id,
            paginationToken: datapull!.paginationToken,
          })
          break
        case RelationshipType.FOLLOWER:
          twitterPullFollower.enqueue({
            access_token_key: datapull!.twitterAccount!.twitterToken,
            access_token_secret: datapull!.twitterAccount!.twitterSecretToken,
            twitterId: datapull!.twitterAccount!.twitterId,
            twitterAccountId: datapull!.twitterAccount!.id,
            paginationToken: datapull!.paginationToken,
          })
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
    }

    // const relationships = await db.relationship.groupBy({
    //   by: ["userId", "twitterUserId",],
    //   _count: {
    //     type: true,
    //   },
    //   having: {
    //     type: {
    //       _count: {
    //         gt: 1,
    //       },
    //     },
    //   },
    // })
    // relationships.forEach(async (relationship) => {
    //   if (relationship._count === 2) {

    //   }
    //   await db.relationship.deleteMany({
    //     where: {
    //       userId: relationship.userId,
    //       twitterUserId: relationship.twitterUserId,
    //     },
    //   })
    //   await db.relationship.create({
    //     data: {
    //       userId: relationship.userId,
    //       twitterUserId: relationship.twitterUserId,
    //       type: RelationshipType.MUTUAL,
    //     },
    //   })
    // })
  }
)
