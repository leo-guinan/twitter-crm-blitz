import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTagsInput extends Pick<Prisma.TagFindManyArgs, "where"> {}

export default resolver.pipe(resolver.authorize(), async ({ where }: GetTagsInput, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  where = where || {}
  where.userId = ctx.session.userId
  const tags = await db.tag.findMany({ where })
  tags.forEach((tag) => console.log(tag))
  return tags
})
