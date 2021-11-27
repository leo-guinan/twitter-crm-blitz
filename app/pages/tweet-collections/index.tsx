import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTweetCollections from "app/tweet-collections/queries/getTweetCollections"

const ITEMS_PER_PAGE = 100

export const TweetCollectionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ tweetCollections, hasMore }] = usePaginatedQuery(getTweetCollections, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {tweetCollections.map((tweetCollection) => (
          <li key={tweetCollection.id}>
            <Link href={Routes.ShowTweetCollectionPage({ tweetCollectionId: tweetCollection.id })}>
              <a>{tweetCollection.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

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
