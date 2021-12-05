import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteTweetCollection = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteTweetCollection),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const tweetCollection = await db.tweetCollection.deleteMany({ where: { id } })

    return tweetCollection
  }
)
