import { Ctx, NotFoundError, resolver } from "blitz"
import db, { SubscriptionCadence } from "db"
import { z } from "zod"

const UpdateSubscription = z.object({
  id: z.number(),
  cadence: z.enum([SubscriptionCadence.DAILY, SubscriptionCadence.WEEKLY]),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateSubscription),
  resolver.authorize(),
  async ({ id, name, cadence }, ctx: Ctx) => {
    const orgId = ctx.session.orgId

    const subscription = await db.subscription.findFirst({
      where: { id, ownerId: orgId },
    })
    if (!subscription) {
      throw new NotFoundError("Subscription not found.")
    }
    return await db.subscription.update({ where: { id }, data: { name, cadence } })
  }
)
