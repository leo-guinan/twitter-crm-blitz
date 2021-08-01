import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteDirectMessage = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteDirectMessage),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const directMessage = await db.directMessage.deleteMany({ where: { id } })

    return directMessage
  }
)
