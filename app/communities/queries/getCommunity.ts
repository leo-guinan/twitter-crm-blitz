import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetCommunity = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetCommunity), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const community = await db.community.findFirst({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      communityMembers: {
        select: {
          id: true,
          account: true,
        },
      },
    },
  })

  if (!community) throw new NotFoundError()

  return community
})
