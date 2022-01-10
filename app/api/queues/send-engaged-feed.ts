import { Queue } from "quirrel/next"
import twitterBuildCollection from "./twitter-build-collection"

import db, { SubscriptionCadence, SubscriptionType } from "db"

export default Queue(
  "api/queues/send-engaged-feed", // 👈 the route it's reachable on
  async (job: { twitterAccountId; orgId }) => {
    const latestReportRunForTwitterAccount = await db.dailyEngagementRecord.findFirst({
      where: {
        primaryTwitterAccountId: job.twitterAccountId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        reportRun: true,
      },
    })

    const twitterAccountsToInclude = await db.dailyEngagementRecord.findMany({
      where: {
        primaryTwitterAccountId: job.twitterAccountId,
        reportRun: latestReportRunForTwitterAccount?.reportRun,
      },
      orderBy: [
        {
          engagementScore: "desc",
        },
      ],
      select: {
        engagingTwitterAccount: true,
      },
      take: 8,
    })

    const accountsToConnect = twitterAccountsToInclude.map(({ engagingTwitterAccount }) => {
      return { id: engagingTwitterAccount.id }
    })

    //subscription maps to mapping table, not account directly. that's why this doesn't work.
    // should be easy to fix tomorrow

    const subscription = await db.subscription.create({
      data: {
        name: "Daily Engagement Feed",
        cadence: SubscriptionCadence.ONCE,
        ownerId: job.orgId,
        twitterAccounts: {
          create: accountsToConnect.map((account) => {
            return {
              type: SubscriptionType.FREE,
              twitterAccount: {
                connect: {
                  id: account.id,
                },
              },
            }
          }),
        },
      },
    })

    await twitterBuildCollection.enqueue({ subscriptionId: subscription.id })
  },
  { exclusive: true }
)
