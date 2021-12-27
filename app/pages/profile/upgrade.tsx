import { Suspense } from "react"
import { BlitzPage } from "blitz"
import Layout from "app/pages/feather/layouts/Layout"
import UpgradePlan from "../../core/components/UpgradePlan"

const UpgradeProfilePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <UpgradePlan />
      </Suspense>
    </div>
  )
}

UpgradeProfilePage.suppressFirstRenderFlicker = true
UpgradeProfilePage.getLayout = (page) => <Layout title="Upgrade Your Account">{page}</Layout>

export default UpgradeProfilePage
