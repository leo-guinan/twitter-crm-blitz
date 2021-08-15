import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateRelation = z.object({
  name: z.string(),
  username: z.string(),
  bio: z.string(),
  twitterId: z.string(),
  profileImageUrl: z.string(),
})

export default resolver.pipe(resolver.zod(CreateRelation), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const relation = await db.relation.create({ data: input })

  return relation
})
