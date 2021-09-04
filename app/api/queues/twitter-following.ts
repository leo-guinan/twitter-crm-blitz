//inital load of twitter account data for new user
import { Queue } from "quirrel/next"
import db, { RelationshipType } from "db"
import Twitter from "twitter-lite"
import twitterFollowing from "./twitter-following"
import { add } from "date-fns"
import Amplify, { API, graphqlOperation } from "aws-amplify"
import { createTwitterDataPull } from "src/graphql/mutations"
export default Queue(
  "api/queues/twitter-following", // 👈 the route it's reachable on
  async (job: { userId }) => {
    try {
      const user = await db.user.findFirst({
        where: { id: job.userId },
        select: {
          id: true,
          twitterId: true,
        },
      })
      await db.twitterDataPull.create({
        data: {
          userId: job.userId,
          relationshipType: RelationshipType.FOLLOWING,
        },
      })
      const twitterDataPull = {
        twitterAccountId: user.twitterId,
        relationshipType: "following",
      }
      const result = await API.graphql(
        graphqlOperation(createTwitterDataPull, { input: twitterDataPull })
      )
    } catch (e) {
      console.log("exception processing: " + e)
    }
  }
)
