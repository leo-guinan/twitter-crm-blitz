import { BlitzPage, usePaginatedQuery, useQuery, useRouter } from "blitz"
import React, { Suspense } from "react"
import Layout from "../feather/layouts/Layout"
import getTweets from "../../tweets/queries/getTweets"
import TweetCollection from "../../tweet-collections/components/TweetCollection"
const ITEMS_PER_PAGE = 100

const RecentTweets = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0

  const [{ tweets }] = usePaginatedQuery(getTweets, {
    orderBy: { tweetCreatedAt: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <div>
      <TweetCollection tweets={tweets.reverse()} showAmplification={true} />
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
