import { resolver, NotFoundError, Ctx } from "blitz"
import db, { SubscriptionStatus, SubscriptionType } from "db"
import { z } from "zod"

const GetSubscription = z.object({})

export default resolver.pipe(
  resolver.zod(GetSubscription),
  resolver.authorize(),
  async ({}, ctx: Ctx) => {
    const subscriptions = await db.subscription.findMany({
      where: {
        ownerId: ctx.session!.orgId,
        status: SubscriptionStatus.ACTIVE,
        type: SubscriptionType.PERSONAL,
      },
    })

    return subscriptions.length
  }
)
