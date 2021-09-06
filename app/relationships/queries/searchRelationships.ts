import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface SearchRelationshipsInput
  extends Pick<Prisma.RelationshipFindManyArgs, "where" | "orderBy" | "skip" | "take"> {
  query: string
}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100, query }: SearchRelationshipsInput, ctx) => {
    const currentOrganization = await db.organization.findFirst({
      where: {
        id: ctx.session.orgId,
      },
      select: {
        twitterAccounts: {
          select: {
            twitterId: true,
          },
        },
      },
    })
    const {
      items: relationships,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.relationship.count({ where }),
      query: (paginateArgs) =>
        db.relationship.findMany({
          ...paginateArgs,
          where: {
            AND: [
              {
                userId: ctx.session.userId,
              },

              {
                OR: [
                  {
                    twitterUser: {
                      username: {
                        contains: query,
                        mode: "insensitive",
                      },
                    },
                  },
                  {
                    twitterUser: {
                      name: {
                        contains: query,
                        mode: "insensitive",
                      },
                    },
                  },
                  {
                    twitterUser: {
                      bio: {
                        contains: query,
                        mode: "insensitive",
                      },
                    },
                  },
                ],
              },
            ],
          },

          orderBy,
          include: {
            twitterUser: true,
            tags: true,
          },
        }),
    })

    return {
      relationships,
      nextPage,
      hasMore,
      count,
    }
  }
)
