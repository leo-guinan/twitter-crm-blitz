import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getFollowers from "app/followers/queries/getFollowers"

const ITEMS_PER_PAGE = 100

export const FollowersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ followers, hasMore }] = usePaginatedQuery(getFollowers, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id}>
            <Link href={Routes.ShowFollowerPage({ followerId: follower.id })}>
              <a>{follower.name}</a>
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

const FollowersPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Followers</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewFollowerPage()}>
            <a>Create Follower</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <FollowersList />
        </Suspense>
      </div>
    </>
  )
}

FollowersPage.authenticate = true
FollowersPage.getLayout = (page) => <Layout>{page}</Layout>

export default FollowersPage
