import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateFollower = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateFollower), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const follower = await db.follower.create({ data: input })

  return follower
})
