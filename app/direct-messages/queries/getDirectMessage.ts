import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetDirectMessage = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetDirectMessage),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const directMessage = await db.directMessage.findFirst({ where: { id } })

    if (!directMessage) throw new NotFoundError()

    return directMessage
  }
)
