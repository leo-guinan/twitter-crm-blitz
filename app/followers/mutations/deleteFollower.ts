import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteFollower = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteFollower), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const follower = await db.follower.deleteMany({ where: { id } })

  return follower
})
