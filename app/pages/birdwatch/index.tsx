import React, { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRelationships from "app/relationships/queries/getRelationships"
import Button from "app/core/components/Button"

const ITEMS_PER_PAGE = 100

export const RelationshipsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ relationships, hasMore }] = usePaginatedQuery(getRelationships, {
    orderBy: { twitterUserId: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <Button label="Send DM to Selected Followers" color="blue" />
      <table className="table-auto border">
        <thead>
          <tr>
            <th>Selected</th>
            <th className="border">Image</th>
            <th className="border">Name</th>
            <th className="border">Bio</th>
            <th className="border">Status</th>
            <th className="border">Tags</th>
          </tr>
        </thead>
        <tbody>
          {relationships.map((relationship) => (
            <tr key={relationship.userId + "_" + relationship.twitterUserId} className="border">
              <td>
                <input
                  type="checkbox"
                  id={
                    "select_relationship_" + relationship.userId + "_" + relationship.twitterUserId
                  }
                  // onClick={handleSelectFollower}
                />
              </td>
              <td className="border">
                {/* <Link href={Routes.ShowRelationshipPage({ userId: relationship.userId, twitterUserId: relationship.twitterUserId })}> */}
                <a>{relationship.twitterUser.name}</a>
                {/* </Link> */}
              </td>
              <td className="border">{relationship.twitterUser.bio}</td>
              <td className="border"></td>
              <td className="border">
                <Button label="Add Tag" color="blue" />
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

const BirdwatchPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Relationships</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <RelationshipsList />
        </Suspense>
      </div>
    </>
  )
}

BirdwatchPage.authenticate = true
BirdwatchPage.getLayout = (page) => <Layout>{page}</Layout>

export default BirdwatchPage
