//inital load of twitter account data for new user
import { Queue } from "quirrel/next"
import db, { RelationshipType } from "db"
import Twitter from "twitter-lite"
import twitterFollowing from "./twitter-following"
import { add } from "date-fns"

export default Queue(
  "api/queues/twitter-following", // 👈 the route it's reachable on
  async (job: { userId }) => {
    try {
      const user = await db.user.findFirst({
        where: { id: job.userId },
        select: {
          id: true,
          twitterId: true,
          memberships: true,
        },
      })
      await db.twitterDataPull.create({
        data: {
          twitterAccountId: user?.memberships[0]?.organization?.twitterAccounts[0]?.twitterId,
          relationshipType: RelationshipType.FOLLOWING,
        },
      })
    } catch (e) {
      console.log("exception processing: " + e)
    }
  }
)
