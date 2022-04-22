import { BlitzPage, getAntiCSRFToken, usePaginatedQuery, useQuery, useRouter } from "blitz"
import React, { Suspense, useEffect } from "react"
import Layout from "../feather/layouts/Layout"
import getTweets from "../../tweets/queries/getTweets"
import TweetCollection from "../../tweet-collections/components/TweetCollection"
import getLoggedInTwitterUser from "../../twitter-accounts/queries/getLoggedInTwitterUser"
const ITEMS_PER_PAGE = 100

const RecentTweets = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const antiCSRFToken = getAntiCSRFToken()
  const [currentTwitterAccount] = useQuery(getLoggedInTwitterUser, {})

  useEffect(() => {
    if (!currentTwitterAccount) return
    window.fetch("/api/twitter/refresh-latest-tweets", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
      body: JSON.stringify({
        twitterAccountTwitterId: currentTwitterAccount.twitterId,
      }),
    })
  }, [])

  const [{ tweets }] = usePaginatedQuery(getTweets, {
    orderBy: { tweetCreatedAt: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <div>
      <TweetCollection tweets={tweets} showAmplification={true} />
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
