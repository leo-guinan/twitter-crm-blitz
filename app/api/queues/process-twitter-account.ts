import { Queue } from "quirrel/next"
import { getEngagement } from "../../util/twitter/engagement"
import { getClientForAccount } from "../../util/twitter/client"

export default Queue(
  "api/queues/process-twitter-account",
  async ({ twitterAccountTwitterId }) => {
    const client = getClientForAccount(twitterAccountTwitterId)
    await getEngagement(client, twitterAccountTwitterId)
  },
  {
    exclusive: true,
  }
)
