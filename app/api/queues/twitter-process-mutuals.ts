import { CronJob } from "quirrel/next"
import db, { RelationshipType } from "db"

export default CronJob(
  "api/queues/twitter-process-mutuals", // 👈 the route that it's reachable on
  "0-59/5 * * * *", // every 5 minutes
  async () => {
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
