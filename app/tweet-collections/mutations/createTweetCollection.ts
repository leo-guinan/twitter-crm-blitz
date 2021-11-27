import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateTweetCollection = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateTweetCollection),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const tweetCollection = await db.tweetCollection.create({ data: input })

    return tweetCollection
  }
)
