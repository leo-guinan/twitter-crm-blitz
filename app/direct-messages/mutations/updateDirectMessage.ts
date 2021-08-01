import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateDirectMessage = z.object({
  id: z.number(),
  message: z.string(),
  to: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateDirectMessage),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const directMessage = await db.directMessage.update({ where: { id }, data })

    return directMessage
  }
)
