import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentOrganization(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const organization = await db.organization.findFirst({
    where: {
      id: session.orgId,
    },
    include: {
      plan: true,
    },
  })

  return organization
}
