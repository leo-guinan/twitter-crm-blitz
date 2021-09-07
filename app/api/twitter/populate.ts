import { BlitzApiRequest, BlitzApiResponse, getSession } from "blitz"
import db, { RelationshipType, ProcessingStatus } from "db"
import twitterFollowers from "app/api/queues/twitter-followers"
import twitterFollowing from "app/api/queues/twitter-following"
const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")

  const session = await getSession(req, res)
  const users = await db.user.findMany({
    select: {
      id: true,
      memberships: {
        select: {
          organization: {
            select: {
              twitterAccounts: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  })

  for (const user of users) {
    if (user?.memberships[0]?.organization?.twitterAccounts[0]?.id) {
      await db.twitterAccountStatus.deleteMany({
        where: {
          twitterAccountId: user?.memberships[0]?.organization?.twitterAccounts[0]?.id,
        },
      })
      await db.twitterAccountStatus.create({
        data: {
          twitterAccountId: user?.memberships[0]?.organization?.twitterAccounts[0]?.id,
          relationshipType: RelationshipType.FOLLOWER,
          status: ProcessingStatus.NOT_STARTED,
        },
      })
      await db.twitterAccountStatus.create({
        data: {
          twitterAccountId: user?.memberships[0]?.organization?.twitterAccounts[0]?.id,
          relationshipType: RelationshipType.MUTUAL,
          status: ProcessingStatus.NOT_STARTED,
        },
      })
      await db.twitterAccountStatus.create({
        data: {
          twitterAccountId: user?.memberships[0]?.organization?.twitterAccounts[0]?.id,
          relationshipType: RelationshipType.FOLLOWING,
          status: ProcessingStatus.NOT_STARTED,
        },
      })

      await twitterFollowing.enqueue({ userId: user.id })
      await twitterFollowers.enqueue({ userId: user.id })
    }
  }

  //populate twitter data

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ userId: session.userId }))
}
export default handler
