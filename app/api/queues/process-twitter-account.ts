import { Queue } from "quirrel/next"
import { getEngagement } from "../../util/twitter/engagement"
import { getClientForAccount } from "../../util/twitter/client"
import { refreshUser } from "../../util/twitter/populate-user"

export default Queue(
  "api/queues/process-twitter-account",
  async ({ twitterAccountTwitterId }) => {
    const client = await getClientForAccount(twitterAccountTwitterId)
    await refreshUser(client, twitterAccountTwitterId)
    await getEngagement(client, twitterAccountTwitterId)
  },
  {
    exclusive: true,
  }
)
