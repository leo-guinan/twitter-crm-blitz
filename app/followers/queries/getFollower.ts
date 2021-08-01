import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetFollower = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetFollower), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const follower = await db.follower.findFirst({ where: { id } })

  if (!follower) throw new NotFoundError()

  return follower
})
