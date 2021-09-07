import moveStaging from "app/api/queues/staging"
import { CronJob } from "quirrel/next"
import db, { ProcessingStatus, RelationshipType } from "db"
export default CronJob(
  "api/queues/twitter-process-staging", // 👈 the route that it's reachable on
  "0-59/5 * * * *", // every 5 minutes

  async () => {
    //find all users that have mutual not started and follower/following complete
    const accountsToProcess = await db.twitterAccountStatus.findMany({
      where: {
        relationshipType: RelationshipType.MUTUAL,
        status: ProcessingStatus.NOT_STARTED,
      },
    })

    for (const account of accountsToProcess) {
      const stillProcessing = await db.twitterAccountStatus.findMany({
        where: {
          AND: [
            { twitterAccountId: account.twitterAccoutId },
            { status: ProcessingStatus.PROCESSING },
          ],
        },
      })
      if (stillProcessing.length === 0) {
        moveStaging.enqueue({ twitterAccountId: account.twitterAccountId })
      }
    }
  }
)
