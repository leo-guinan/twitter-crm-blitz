import { BlitzPage } from "blitz"
import React, { Suspense } from "react"
import Layout from "../feather/layouts/Layout"

const RecentTweets = () => {
  return (
    <div>
      <h1>Recent Tweets</h1>
    </div>
  )
}

const RecentTweetsPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <RecentTweets />
      </Suspense>
    </div>
  )
}

RecentTweetsPage.authenticate = true
RecentTweetsPage.getLayout = (page) => <Layout>{page}</Layout>

export default RecentTweetsPage
