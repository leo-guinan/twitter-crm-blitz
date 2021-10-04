import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import { loadStripe } from "@stripe/stripe-js"
import Layout from "app/pages/feather/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import createCheckoutSession from "app/users/mutations/createCheckoutSession"
import customerPortal from "app/users/mutations/customerPortal"
import { getAntiCSRFToken } from "blitz"
import Button from "app/core/components/Button"
import CTA from "app/core/components/CTA"
import Welcome from "app/core/components/Welcome"
import LandingPage from "app/core/components/LandingPage"
import { isUserWaitlisted } from "../../core/hooks/isUserWaitlisted"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const userWaitlisted = isUserWaitlisted()
  if (currentUser && !userWaitlisted) {
    return (
      <>
        <div>
          <Welcome />
        </div>
      </>
    )
  } else if (currentUser && userWaitlisted) {
    return (
      <>
        <div>
          You&apos;re on the waitlist. We&apos;ll contact you soon. This is where your dashboard
          will be.
        </div>
      </>
    )
  } else {
    return (
      <>
        <LandingPage />
      </>
    )
  }
}

const UserHome: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </div>
  )
}

UserHome.suppressFirstRenderFlicker = true
UserHome.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default UserHome
