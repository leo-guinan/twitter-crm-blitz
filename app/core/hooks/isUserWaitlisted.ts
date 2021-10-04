import { useQuery } from "blitz"
import isUserOnWaitlist from "app/users/queries/isUserOnWaitlist"

export const isUserWaitlisted = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isUserWaitlisted] = useQuery(isUserOnWaitlist, null)
  return isUserWaitlisted
}
