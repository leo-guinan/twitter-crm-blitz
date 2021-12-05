import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateTweetCollection = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateTweetCollection),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const tweetCollection = await db.tweetCollection.update({ where: { id }, data })

    return tweetCollection
  }
)
