import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateSubscription = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateSubscription),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const subscription = await db.subscription.create({ data: input })

    return subscription
  }
)
