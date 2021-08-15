import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateRelationship = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateRelationship),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const relationship = await db.relationship.update({ where: { id }, data })

    return relationship
  }
)
