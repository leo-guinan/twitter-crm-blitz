import { Ctx, NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetBoostRequestStatsForUser = z.object({})

export default resolver.pipe(
  resolver.zod(GetBoostRequestStatsForUser),
  resolver.authorize(),
  async ({}, ctx: Ctx) => {
    const orgId = ctx.session?.orgId

    const twitterAccount = await db.twitterAccount.findFirst({
      where: {
        organizationId: orgId,
      },
    })

    if (!twitterAccount) {
      throw new NotFoundError()
    }

    const currentMonth = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
    const previousMonth = new Date(Date.now() - 1000 * 60 * 60 * 24 * 60)

    const numberOfRequestsSent = await db.boostRequestRecord.count({
      where: {
        requestorTwitterAccountId: twitterAccount.id,
        createdAt: {
          gt: currentMonth,
        },
      },
    })

    const previousRequestsSent = await db.boostRequestRecord.count({
      where: {
        requestorTwitterAccountId: twitterAccount.id,
        createdAt: {
          gt: previousMonth,
          lt: currentMonth,
        },
      },
    })

    const requestsChange = numberOfRequestsSent - previousRequestsSent

    const requestsDirection = requestsChange > 0 ? "increase" : "decrease"

    const requestsViewed = await db.boostRequestRecord.count({
      where: {
        requestorTwitterAccountId: twitterAccount.id,
        createdAt: {
          gt: currentMonth,
        },
        visited: true,
      },
    })

    const previousRequestsViewed = await db.boostRequestRecord.count({
      where: {
        requestorTwitterAccountId: twitterAccount.id,
        createdAt: {
          gt: previousMonth,
          lt: currentMonth,
        },
        visited: true,
      },
    })

    const viewedChange = requestsViewed - previousRequestsViewed

    const viewedDirection = viewedChange > 0 ? "increase" : "decrease"

    const requestsAmplified = await db.boostRequestRecord.count({
      where: {
        requestorTwitterAccountId: twitterAccount.id,
        createdAt: {
          gt: currentMonth,
        },
        amplified: true,
      },
    })

    const previousRequestsAmplified = await db.boostRequestRecord.count({
      where: {
        requestorTwitterAccountId: twitterAccount.id,
        createdAt: {
          gt: previousMonth,
          lt: currentMonth,
        },
        amplified: true,
      },
    })

    const amplifiedChange = requestsAmplified - previousRequestsAmplified

    const amplifiedDirection = amplifiedChange > 0 ? "increase" : "decrease"

    return [
      {
        id: 1,
        name: "Total Amplifications Sent",
        stat: `${numberOfRequestsSent}`,
        change: `${requestsChange}`,
        changeType: requestsDirection,
      },
      {
        id: 2,
        name: "Amplifications Viewed",
        stat: `${requestsViewed}`,
        change: `${viewedChange}`,
        changeType: viewedDirection,
      },
      {
        id: 3,
        name: "Amplifications Amplified",
        stat: `${requestsAmplified}`,
        change: `${amplifiedChange}`,
        changeType: amplifiedDirection,
      },
    ]
  }
)
