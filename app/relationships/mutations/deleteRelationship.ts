import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteRelationship = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteRelationship),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const relationship = await db.relationship.deleteMany({ where: { id } })

    return relationship
  }
)
