import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteTag = z.object({
  userId: z.number(),
  twitterUserId: z.string(),
  value: z.string(),
})

export default resolver.pipe(
  resolver.zod(DeleteTag),
  resolver.authorize(),
  async ({ userId, twitterUserId, value }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const tag = await db.tag.deleteMany({ where: { userId, twitterUserId, value } })

    return tag
  }
)
