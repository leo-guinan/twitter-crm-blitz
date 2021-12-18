import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateUserEmail = z.object({
  email: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateUserEmail),
  resolver.authorize(),
  async ({ email, ...data }, ctx) => {
    const userId = ctx.session.userId

    const user = await db.user.update({
      where: { id: userId },
      data: {
        email,
      },
    })

    return user
  }
)
