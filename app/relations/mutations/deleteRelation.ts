import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteRelation = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteRelation), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const relation = await db.relation.deleteMany({ where: { id } })

  return relation
})
