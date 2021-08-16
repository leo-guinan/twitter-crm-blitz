import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import { loadStripe } from "@stripe/stripe-js"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import createCheckoutSession from "app/users/mutations/createCheckoutSession"
import customerPortal from "app/users/mutations/customerPortal"
import { getAntiCSRFToken } from "blitz"
import Button from "app/core/components/Button"
import CTA from "app/core/components/CTA"
import Welcome from "app/core/components/Welcome"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <>
        <div>
          <Welcome />
        </div>
      </>
    )
  } else {
    return (
      <>
        <CTA />
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
