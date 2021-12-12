import { Ctx, NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteSubscription = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteSubscription),
  resolver.authorize(),
  async ({ id }, ctx: Ctx) => {
    const orgId = ctx.session.orgId

    const subscription = await db.subscription.findFirst({
      where: { id, ownerId: orgId },
    })
    if (!subscription) {
      throw new NotFoundError("Subscription not found.")
    }

    return await db.subscription.deleteMany({ where: { id } })
  }
)
