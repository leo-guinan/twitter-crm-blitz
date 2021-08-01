import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateFollower = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateFollower),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const follower = await db.follower.update({ where: { id }, data })

    return follower
  }
)
