import { Queue } from "quirrel/next"

import db, { RelationshipType, ProcessingStatus } from "db"

export default Queue(
  "api/queues/staging",
  async (job: { twitterAccountId }) => {
    const relationshipsToProcess = await db.relationshipStaging.groupBy({
      by: ["twitterAccountId", "twitterUserId"],
      _count: {
        type: true,
      },
      having: {
        type: {
          _count: {
            gt: 1,
          },
        },
      },
    })

    await db.twitterAccountStatus.update({
      where: {
        twitterAccountId_relationshipType: {
          twitterAccountId: job.twitterAccountId,
          relationshipType: RelationshipType.MUTUAL,
        },
      },
      data: {
        status: ProcessingStatus.PROCESSING,
      },
    })

    for (const relationship of relationshipsToProcess) {
      try {
        //insert as mutual
        await db.relationship.upsert({
          where: {
            twitterAccountId_twitterUserId: {
              twitterAccountId: job.twitterAccountId,
              twitterUserId: relationship.twitterUserId,
            },
          },
          update: {
            type: RelationshipType.MUTUAL,
          },
          create: {
            type: RelationshipType.MUTUAL,
            twitterAccountId: job.twitterAccountId,
            twitterUserId: relationship.twitterUserId,
          },
        })
      } catch (e) {
        console.error(
          "Caught exception trying to process mutuals. Trying again due to possible race condition: " +
            e
        )
        await db.relationship.upsert({
          where: {
            twitterAccountId_twitterUserId: {
              twitterAccountId: job.twitterAccountId,
              twitterUserId: relationship.twitterUserId,
            },
          },
          update: {
            type: RelationshipType.MUTUAL,
          },
          create: {
            type: RelationshipType.MUTUAL,
            twitterAccountId: job.twitterAccountId,
            twitterUserId: relationship.twitterUserId,
          },
        })
      }
      await db.relationshipStaging.deleteMany({
        where: {
          twitterAccountId: job.twitterAccountId,
          twitterUserId: relationship.twitterUserId,
        },
      })
    }

    const relationships = await db.relationshipStaging.findMany({
      where: {
        twitterAccountId: job.twitterAccountId,
      },
    })

    for (const relationship of relationships) {
      await db.relationship.upsert({
        where: {
          twitterAccountId_twitterUserId: {
            twitterAccountId: job.twitterAccountId,
            twitterUserId: relationship.twitterUserId,
          },
        },
        update: {
          type: relationship.type,
        },
        create: {
          type: relationship.type,
          twitterAccountId: job.twitterAccountId,
          twitterUserId: relationship.twitterUserId,
        },
      })
      await db.relationshipStaging.deleteMany({
        where: {
          twitterAccountId: job.twitterAccountId,
          twitterUserId: relationship.twitterUserId,
        },
      })
    }

    await db.twitterAccountStatusHistorical.create({
      data: {
        twitterAccountId: job.twitterAccountId,
        relationshipType: RelationshipType.MUTUAL,
        status: ProcessingStatus.COMPLETE,
      },
    })
    await db.twitterAccountStatus.delete({
      where: {
        twitterAccountId_relationshipType: {
          twitterAccountId: job.twitterAccountId,
          relationshipType: RelationshipType.MUTUAL,
        },
      },
    })
  },

  { exclusive: true }
)
