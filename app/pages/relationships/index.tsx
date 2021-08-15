import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRelationships from "app/relationships/queries/getRelationships"

const ITEMS_PER_PAGE = 100

export const RelationshipsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ relationships, hasMore }] = usePaginatedQuery(getRelationships, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {relationships.map((relationship) => (
          <li key={relationship.id}>
            <Link href={Routes.ShowRelationshipPage({ relationshipId: relationship.id })}>
              <a>{relationship.name}</a>
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

const RelationshipsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Relationships</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewRelationshipPage()}>
            <a>Create Relationship</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <RelationshipsList />
        </Suspense>
      </div>
    </>
  )
}

RelationshipsPage.authenticate = true
RelationshipsPage.getLayout = (page) => <Layout>{page}</Layout>

export default RelationshipsPage
