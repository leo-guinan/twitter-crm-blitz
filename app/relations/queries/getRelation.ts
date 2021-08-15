import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetRelation = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetRelation), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const relation = await db.relation.findFirst({ where: { id } })

  if (!relation) throw new NotFoundError()

  return relation
})
