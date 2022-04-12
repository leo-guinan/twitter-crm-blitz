import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetPlans = z.object({})

export default resolver.pipe(resolver.zod(GetPlans), async ({}) => {
  const plans = await db.plan.findMany({
    orderBy: {
      id: "asc",
    },
  })
  return plans
})
