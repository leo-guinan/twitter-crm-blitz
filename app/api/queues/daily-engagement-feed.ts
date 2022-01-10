import { CronJob } from "quirrel/next"
import db from "db"
import sendEngagedFeed from "./send-engaged-feed"

export default CronJob(
  "api/queues/daily-engagement-feed", // 👈 the route that it's reachable on
  "0 0 * * *", // once a day at 12am
  async () => {
    await db.organization
      .findMany({
        where: {
          planId: {
            not: 1,
          },
        },
        select: {
          id: true,
          twitterAccounts: true,
        },
      })
      .then(async (orgs) => {
        for (const org of orgs) {
          await sendEngagedFeed.enqueue({
            twitterAccountId: org?.twitterAccounts[0]?.id,
            orgId: org.id,
          })
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
)
