import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateSubscription = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateSubscription),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const subscription = await db.subscription.update({ where: { id }, data })

    return subscription
  }
)
