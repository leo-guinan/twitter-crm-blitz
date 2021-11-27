import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetTweetCollection = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetTweetCollection),
  resolver.authorize(),
  async ({ id }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const currentOrganization = await db.organization.findFirst({
      where: {
        id: ctx.session.orgId,
      },
      select: {
        twitterAccounts: {
          select: {
            id: true,
            twitterId: true,
          },
        },
      },
    })
    const tweetCollection = await db.tweetCollection.findFirst({
      where: {
        id,
      },
      select: {
        subscription: {
          select: {
            owner: {
              select: {
                id: true,
              },
            },
          },
        },
        tweets: {
          select: {
            tweetCreatedAt: true,
            message: true,
            author: {
              select: {
                name: true,
                profilePictureUrl: true,
              },
            },
          },
        },
      },
    })

    if (!tweetCollection) throw new NotFoundError()

    return tweetCollection
  }
)
