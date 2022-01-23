import { Queue } from "quirrel/next"
import db from "../../../db"

export default Queue(
  "api/queues/new-user-lookup",
  async ({ twitterId }) => {
    const authenticatedUser = await db.twitterAccount.findFirst({
      where: {
        twitterId,
      },
    })

    //get tweets for user
  },
  {}
)
