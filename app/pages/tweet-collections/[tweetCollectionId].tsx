import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "../feather/layouts/Layout"
import getTweetCollection from "app/tweet-collections/queries/getTweetCollection"
import deleteTweetCollection from "app/tweet-collections/mutations/deleteTweetCollection"
import TweetCollection from "../../tweet-collections/components/TweetCollection"

export const TweetCollectionWrapper = () => {
  const router = useRouter()
  const tweetCollectionId = useParam("tweetCollectionId", "number")
  const [deleteTweetCollectionMutation] = useMutation(deleteTweetCollection)
  const [tweetCollection] = useQuery(getTweetCollection, { id: tweetCollectionId })

  return (
    <>
      <TweetCollection tweets={tweetCollection} />
    </>
  )
}

const ShowTweetCollectionPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TweetCollectionsPage()}>
          <a>TweetCollections</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <TweetCollectionWrapper />
      </Suspense>
    </div>
  )
}

ShowTweetCollectionPage.authenticate = true
ShowTweetCollectionPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTweetCollectionPage
