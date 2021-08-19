import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateRelationship = z.object({
  userId: z.number(),
  twitterUserId: z.string(),
  type: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateRelationship),
  resolver.authorize(),
  async ({ userId, twitterUserId, type, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const relationship = await db.relationship.update({
      where: {
        userId_twitterUserId_type: {
          userId,
          twitterUserId,
          type,
        },
      },
      data,
    })

    return relationship
  }
)
