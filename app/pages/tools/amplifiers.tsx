import React from "react"
import Layout from "../feather/layouts/Layout"
import TwitterUserList from "../../twitter-user/components/TwitterUserList"
import { Routes, useQuery, useRouter } from "blitz"
import getAmplifiersForUser from "../../amplifier/queries/getAmplifiersForUser"
import getAccountsUserIsAmplifying from "../../amplifier/queries/getAccountsUserIsAmplifying"

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
  const [amplifying] = useQuery(getAccountsUserIsAmplifying, {})

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
        <h1>Amplified By</h1>
        <TwitterUserList
          twitterUsers={amplifiers.map((amplifier) => amplifier.owner)}
          actionHandler={handleViewUserProfile}
          actionCTA="View Profile"
          actionPerformed={() => false}
          view="compact"
        />
      </section>
      <section className="border-2 mx-4 p-6">
        <h1>Amplifying</h1>
        <TwitterUserList
          twitterUsers={amplifiers.map((amplifier) => amplifier.owner)}
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
