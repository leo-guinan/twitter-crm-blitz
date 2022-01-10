import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetCommunity = z.object({
  // This accepts type of undefined, but is required at runtime
  slug: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetCommunity), async ({ slug }) => {
  const community = await db.community.findFirst({
    where: { slug },
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
