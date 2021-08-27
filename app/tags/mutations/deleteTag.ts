import { resolver } from "blitz"
import db, { RelationshipType } from "db"
import { z } from "zod"

const DeleteTag = z.object({
  userId: z.number(),
  twitterUserId: z.string(),
  value: z.string(),
  relationshipType: z.enum([
    RelationshipType.FOLLOWER,
    RelationshipType.FOLLOWING,
    RelationshipType.MUTUAL,
  ]),
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
