import React from "react"
import Layout from "../feather/layouts/Layout"
import { Routes, useQuery, useRouter } from "blitz"
import getAmplifiersForUser from "../../amplifier/queries/getAmplifiersForUser"
import getAccountsUserIsAmplifying from "../../amplifier/queries/getAccountsUserIsAmplifying"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"
import Pricing from "../../core/components/Pricing"
import CumulativeStats from "../../core/components/CumulativeStats"
import AmplificationStatsTable from "../../core/components/AmplificationStatsTable"

interface TwitterAccount {
  id: number
  twitterId: string
  twitterUsername: string
  twitterName: string
  twitterBio: string
  twitterProfilePictureUrl: string
}

const AnalyticsPage = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const [amplifiers] = useQuery(getAmplifiersForUser, {})
  const [amplifying] = useQuery(getAccountsUserIsAmplifying, {})

  const handleViewUserProfile = async (event) => {
    const targetSlug = amplifiers.find(
      (amplifier) => amplifier.amplifiedAccount.twitterId === event.target.dataset.twitterId
    )?.amplifiedAccount?.slug
    if (!targetSlug) return
    router.push(Routes.FollowAccountPage({ slug: targetSlug }))
  }

  return (
    <>
      {currentUser?.memberships[0]?.organization?.planId !== 1 &&
        currentUser?.memberships[0]?.organization?.subscriptionStatus === "active" && (
          <section>
            <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <CumulativeStats />
              </div>
              <div className="px-4 py-5 sm:p-6">{/* Content goes here */}</div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <AmplificationStatsTable />
              </div>
              <div className="px-4 py-5 sm:p-6">{/* Content goes here */}</div>
            </div>
          </section>
        )}
      {/*{(currentUser?.memberships[0]?.organization?.planId === 1 || currentUser?.memberships[0]?.organization?.subscriptionStatus !== 'active')  && (*/}
      <>
        <h1>Sorry, this is not available for free accounts.</h1>
        <Pricing />
      </>
      {/*)}*/}
    </>
  )
}

AnalyticsPage.authenticate = true
AnalyticsPage.getLayout = (page) => <Layout>{page}</Layout>

export default AnalyticsPage
