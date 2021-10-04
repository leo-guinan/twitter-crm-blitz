//inital load of twitter account data for new user
import { Queue } from "quirrel/next"
import db, { RelationshipType, ProcessingStatus } from "db"
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
          memberships: {
            select: {
              organization: {
                select: {
                  twitterAccounts: {
                    select: {
                      id: true,
                      twitterId: true,
                    },
                  },
                },
              },
            },
          },
        },
      })
      if (user?.memberships[0]?.organization?.twitterAccounts[0]?.twitterId) {
        await db.twitterDataPull.create({
          data: {
            twitterAccountId: user?.memberships[0]?.organization?.twitterAccounts[0]?.id,
            relationshipType: RelationshipType.FOLLOWING,
          },
        })
      }
    } catch (e) {
      console.log("exception processing: " + e)
    }
  }
)
