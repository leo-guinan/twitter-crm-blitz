import { resolver } from "blitz"
import db, { RelationshipType } from "db"
import { z } from "zod"

const CreateTag = z.object({
  twitterAccountId: z.number(),
  twitterUserId: z.string(),
  value: z.string(),
})

export default resolver.pipe(resolver.zod(CreateTag), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const tag = await db.tag.create({ data: input })

  return tag
})
