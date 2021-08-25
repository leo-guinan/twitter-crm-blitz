import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTagsInput extends Pick<Prisma.TagFindManyArgs, "where"> {}

export default resolver.pipe(resolver.authorize(), async ({ where }: GetTagsInput, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant

  const tags = await db.tag.groupBy({
    by: ["userId", "value"],
    _count: {
      twitterUserId: true,
    },
    where: {
      userId: ctx.session.userId,
    },
  })
  tags.forEach((tag) => console.log(tag))
  return tags
})
