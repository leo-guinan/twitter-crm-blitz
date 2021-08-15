import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateRelation = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateRelation),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const relation = await db.relation.update({ where: { id }, data })

    return relation
  }
)
