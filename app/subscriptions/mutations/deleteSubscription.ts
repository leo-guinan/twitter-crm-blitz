import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteSubscription = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteSubscription),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const subscription = await db.subscription.deleteMany({ where: { id } })

    return subscription
  }
)
