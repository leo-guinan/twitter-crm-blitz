import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetPlans = z.object({})

export default resolver.pipe(resolver.zod(GetPlans), resolver.authorize(), async ({}) => {
  const plans = await db.plan.findMany({
    orderBy: {
      id: "asc",
    },
  })
  console.log(JSON.stringify(plans))
  return plans
})
