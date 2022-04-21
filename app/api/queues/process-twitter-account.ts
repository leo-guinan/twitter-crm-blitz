import { Queue } from "quirrel/next"
import { getEngagement } from "../../util/twitter/engagement"
import { getClientForAccount } from "../../util/twitter/client"
import { refreshUser } from "../../util/twitter/populate-user"
import db from "db"
export default Queue(
  "api/queues/process-twitter-account",
  async ({ twitterAccountTwitterId }) => {
    const twitterAccount = await db.twitterAccount.findFirst({
      where: {
        twitterId: twitterAccountTwitterId,
      },
    })

    const client = await getClientForAccount(twitterAccount)
    await refreshUser(client, twitterAccountTwitterId)
    await getEngagement(client, twitterAccountTwitterId)
  },
  {
    exclusive: true,
  }
)
