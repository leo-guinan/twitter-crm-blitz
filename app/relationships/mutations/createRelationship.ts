import { resolver } from "blitz"
import db, { RelationshipType } from "db"
import { z } from "zod"

const CreateRelationship = z.object({
  type: z.enum([RelationshipType.FOLLOWER, RelationshipType.FOLLOWING, RelationshipType.MUTUAL]),
  twitterUserId: z.string(),
  userId: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreateRelationship),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const relationship = await db.relationship.create({ data: input })

    return relationship
  }
)
