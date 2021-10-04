import { Ctx } from "blitz"
import db from "db"

export default async function isUserOnWaitlist(_ = null, { session }: Ctx) {
  if (!session.userId) return false
  const user = await db.user.findFirst({
    where: {
      id: session.userId,
    },
    select: {
      id: true,
      name: true,
      role: true,
      memberships: {
        select: {
          organization: {
            select: {
              trial: true,
              subscriptionStatus: true,
              twitterAccounts: {
                select: {
                  twitterId: true,
                  twitterAccountWaitlist: {
                    select: {
                      id: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  console.log(JSON.stringify(user))
  return (
    user && !!user!?.memberships[0]?.organization?.twitterAccounts[0]?.twitterAccountWaitlist?.id
  )
}
