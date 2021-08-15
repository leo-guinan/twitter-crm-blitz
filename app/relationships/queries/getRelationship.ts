import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetRelationship = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetRelationship),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const relationship = await db.relationship.findFirst({ where: { userId: id } })

    if (!relationship) throw new NotFoundError()

    return relationship
  }
)
