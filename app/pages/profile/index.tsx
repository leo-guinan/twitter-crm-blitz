import { Suspense } from "react"
import { BlitzPage } from "blitz"
import Layout from "app/pages/feather/layouts/Layout"
import UserProfile from "../../core/components/UserProfile"

const ProfilePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <UserProfile />
      </Suspense>
    </div>
  )
}

ProfilePage.suppressFirstRenderFlicker = true
ProfilePage.getLayout = (page) => <Layout title="User Profile">{page}</Layout>

export default ProfilePage
