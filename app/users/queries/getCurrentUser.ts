import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      role: true,
      email: true,
      memberships: {
        select: {
          organization: {
            select: {
              subscriptionStatus: true,
              stripeCustomerId: true,
              twitterAccounts: {
                select: {
                  twitterId: true,
                },
              },
            },
          },
        },
      },
    },
  })

  return user
}
