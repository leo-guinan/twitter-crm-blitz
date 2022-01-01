import React, { Suspense } from "react"
import { BlitzPage, Head, Link, Routes, usePaginatedQuery, useRouter } from "blitz"
import Layout from "app/pages/feather/layouts/Layout"
import getCommunities from "app/communities/queries/getCommunities"

const ITEMS_PER_PAGE = 100

export const CommunitiesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ communities, hasMore }] = usePaginatedQuery(getCommunities, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div className="border-2  m-4 w-full max-w-md p-6 mx-auto">
      <ul>
        <h2 className="w-full border-b-2 p-4 flex">
          <span className="inline-block mx-auto">Communities You Are Part Of</span>
        </h2>
        {!communities.length && <span>You are not currently a member of any communities.</span>}
        {communities.length && (
          <>
            {communities.map((comm) => (
              <div className="p-4" key={comm.id}>
                <Link href={Routes.ShowCommunityPage({ communityId: comm.id })}>
                  <span className="cursor-pointer">{comm.name}</span>
                </Link>
              </div>
            ))}
          </>
        )}
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

const CommunitiesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Communities</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewCommunityPage()}>
            <a>Create Community</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CommunitiesList />
        </Suspense>
      </div>
    </>
  )
}

CommunitiesPage.authenticate = true
CommunitiesPage.getLayout = (page) => <Layout>{page}</Layout>

export default CommunitiesPage
