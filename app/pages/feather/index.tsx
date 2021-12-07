import { Suspense } from "react"
import { BlitzPage } from "blitz"
import Layout from "app/pages/feather/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Welcome from "app/core/components/Welcome"
import LandingPage from "app/core/components/LandingPage"

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
