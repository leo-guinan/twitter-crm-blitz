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

  const handleSelectFollower = (e) => {
    console.log(e.target)
  }

  return (
    <div>
      <table className="table-auto border">
        <thead>
          <tr>
            <th>Selected</th>
            <th className="border">Name</th>
            <th className="border">Bio</th>
            <th className="border">Status</th>
            <th className="border">Tags</th>
          </tr>
        </thead>
        <tbody>
          {followers.map((follower) => (
            <tr key={follower.id} className="border">
              <td>
                <input
                  type="checkbox"
                  id={"select_follower_" + follower.id}
                  onClick={handleSelectFollower}
                />
              </td>
              <td className="border">
                <Link href={Routes.ShowFollowerPage({ followerId: follower.id })}>
                  <a>{follower.name}</a>
                </Link>
              </td>
              <td className="border">{follower.bio}</td>
              <td className="border">{follower.status}</td>
              <td className="border">
                {/* {follower.tags && follower.tags.map((tag) => <span key={tag.id}>{tag.value}</span>)} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
