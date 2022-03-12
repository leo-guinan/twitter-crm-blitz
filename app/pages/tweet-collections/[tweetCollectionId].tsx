import { Suspense } from "react"
import {
  Head,
  Link,
  useRouter,
  useQuery,
  useParam,
  BlitzPage,
  useMutation,
  Routes,
  usePaginatedQuery,
} from "blitz"
import Layout from "../../core/layouts/Layout"
import getTweetCollection from "app/tweet-collections/queries/getTweetCollection"
import deleteTweetCollection from "app/tweet-collections/mutations/deleteTweetCollection"
import TweetCollection from "../../tweet-collections/components/TweetCollection"
import getTweets from "../../tweets/queries/getTweets"

export const TweetCollectionWrapper = () => {
  const router = useRouter()
  const tweetCollectionId = useParam("tweetCollectionId", "number")
  const [deleteTweetCollectionMutation] = useMutation(deleteTweetCollection)
  const [tweetCollection] = useQuery(getTweetCollection, { id: tweetCollectionId })
  const ITEMS_PER_PAGE = 10
  const page = Number(router.query.page) || 0

  return (
    <>
      <TweetCollection tweets={tweetCollection} />
    </>
  )
}

const ShowTweetCollectionPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <TweetCollectionWrapper />
      </Suspense>
    </div>
  )
}

ShowTweetCollectionPage.authenticate = false
ShowTweetCollectionPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTweetCollectionPage
