import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetActiveTwitterAccount = z.object({})

export default resolver.pipe(resolver.zod(GetActiveTwitterAccount), async ({}, ctx) => {
  const orgId = ctx.session.orgId

  if (!orgId) {
    throw new NotFoundError()
  }

  const twitterAccount = await db.twitterAccount.findFirst({
    where: {
      organizationId: orgId,
    },
  })

  if (!twitterAccount) throw new NotFoundError()

  return twitterAccount
})
