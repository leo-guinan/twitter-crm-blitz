import React, { useState } from "react"
import Layout from "../feather/layouts/Layout"
import TwitterUserList from "../../twitter-user/components/TwitterUserList"
import { SubscriptionCadence } from "db"
import { getAntiCSRFToken, Routes, useMutation, useQuery, useRouter } from "blitz"
import createSubscription from "../../subscriptions/mutations/createSubscription"
import getAmplifiersForUser from "../../amplifier/queries/getAmplifiersForUser"
import FollowAccountPage from "../profile/[slug]"
import getLoggedInTwitterUser from "../../twitter-accounts/queries/getLoggedInTwitterUser"

interface TwitterAccount {
  id: number
  twitterId: string
  twitterUsername: string
  twitterName: string
  twitterBio: string
  twitterProfilePictureUrl: string
}

const AmplifiersPage = () => {
  const router = useRouter()
  const [amplifiers] = useQuery(getAmplifiersForUser, {})

  const handleViewUserProfile = async (event) => {
    console.log()
    const targetSlug = amplifiers.find(
      (amplifier) => amplifier.amplifiedAccount.twitterId === event.target.dataset.twitterId
    )?.amplifiedAccount?.slug
    if (!targetSlug) return
    router.push(Routes.FollowAccountPage({ slug: targetSlug }))
  }

  return (
    <>
      <section className="border-2 mx-4 p-6">
        <TwitterUserList
          twitterUsers={amplifiers.map((amplifier) => amplifier.amplifiedAccount)}
          actionHandler={handleViewUserProfile}
          actionCTA="View Profile"
          actionPerformed={() => false}
          view="compact"
        />
      </section>
    </>
  )
}

AmplifiersPage.authenticate = true
AmplifiersPage.getLayout = (page) => <Layout>{page}</Layout>

export default AmplifiersPage
