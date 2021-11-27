import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetSubscription = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetSubscription),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const subscription = await db.subscription.findFirst({ where: { id } })

    if (!subscription) throw new NotFoundError()

    return subscription
  }
)
