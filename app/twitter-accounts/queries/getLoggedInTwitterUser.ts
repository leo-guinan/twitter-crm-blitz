import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetActiveTwitterAccount = z.object({})

export default resolver.pipe(resolver.zod(GetActiveTwitterAccount), async ({}, ctx) => {
  const orgId = ctx.session.orgId

  if (!orgId) {
    return null
  }

  const twitterAccount = await db.twitterAccount.findFirst({
    where: {
      organizationId: orgId,
    },
  })

  return twitterAccount
})
