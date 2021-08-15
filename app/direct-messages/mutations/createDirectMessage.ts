import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateDirectMessage = z.object({
  message: z.string(),
  to: z.string(),
  from: z.string(),
  userId: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreateDirectMessage),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const directMessage = await db.directMessage.create({ data: input })

    return directMessage
  }
)
