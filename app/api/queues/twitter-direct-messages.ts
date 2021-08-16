import { Queue } from "quirrel/next"

export default Queue(
  "api/queues/twitter-direct-messages", // 👈 the route it's reachable on
  async (job: { userId; paginationToken }) => {
    console.log("Ready to pull DMs. ")
  }
)
