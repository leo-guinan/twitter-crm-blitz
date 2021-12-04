import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import TweetCollectionsList from "../../tweet-collections/components/TweetCollectionList"

const TweetCollectionsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>TweetCollections</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTweetCollectionPage()}>
            <a>Create TweetCollection</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TweetCollectionsList />
        </Suspense>
      </div>
    </>
  )
}

TweetCollectionsPage.authenticate = true
TweetCollectionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default TweetCollectionsPage
