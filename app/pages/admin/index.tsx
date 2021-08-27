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
import AdminDashboard from "app/core/components/AdminDashboard"
import { UserRole } from "db"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Admin = () => {
  const currentUser = useCurrentUser()

  if (currentUser?.role === UserRole.ADMIN) {
    return (
      <>
        <div>
          <AdminDashboard />
        </div>
      </>
    )
  } else {
    return (
      <>
        <section>You don&apost;t have authorization to access this page.</section>
      </>
    )
  }
}

const AdminHome: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <Admin />
      </Suspense>
    </div>
  )
}

AdminHome.suppressFirstRenderFlicker = true
AdminHome.getLayout = (page) => <Layout title="Admin">{page}</Layout>

export default AdminHome
