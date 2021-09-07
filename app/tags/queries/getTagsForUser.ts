import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTagsInput extends Pick<Prisma.TagFindManyArgs, "where"> {}

export default resolver.pipe(resolver.authorize(), async ({ where }: GetTagsInput, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant

  const currentOrganization = await db.organization.findFirst({
    where: {
      id: ctx.session.orgId,
    },
    select: {
      twitterAccounts: {
        select: {
          id: true,
        },
      },
    },
  })
  if (currentOrganization?.twitterAccounts[0]?.id) {
    return await db.tag.groupBy({
      by: ["twitterAccountId", "value"],
      _count: {
        twitterUserId: true,
      },
      where: {
        twitterAccountId: currentOrganization?.twitterAccounts[0]?.id,
      },
    })
  }

  return []
})
