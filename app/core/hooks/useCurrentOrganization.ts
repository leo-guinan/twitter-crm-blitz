import { useQuery } from "blitz"
import getCurrentOrganization from "app/organizations/queries/getCurrentOrganization"

export const useCurrentOrganization = () => {
  const [organization] = useQuery(getCurrentOrganization, null)
  return organization
}
