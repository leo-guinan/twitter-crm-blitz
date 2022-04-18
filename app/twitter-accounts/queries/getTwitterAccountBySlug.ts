import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetTwitterAccount = z.object({
  // This accepts type of undefined, but is required at runtime
  slug: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetTwitterAccount), async ({ slug }) => {
  if (!slug) {
    throw new NotFoundError()
  }

  const twitterAccount = await db.twitterAccount.findFirst({
    where: { slug },
  })

  if (!twitterAccount) {
    const lookup = await db.twitterAccount.findFirst({
      where: {
        twitterUsername: {
          equals: slug,
          mode: "insensitive",
        },
      },
    })
    if (!lookup) {
      throw new NotFoundError()
    }
    if (!lookup.slug) {
      await db.twitterAccount.update({
        where: { id: lookup.id },
        data: { slug: lookup.twitterUsername },
      })
    }
    return lookup
  }

  return twitterAccount
})
