import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRelations from "app/relations/queries/getRelations"

const ITEMS_PER_PAGE = 100

export const RelationsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ relations, hasMore }] = usePaginatedQuery(getRelations, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {relations.map((relation) => (
          <li key={relation.id}>
            <Link href={Routes.ShowRelationPage({ relationId: relation.id })}>
              <a>{relation.name}</a>
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

const RelationsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Relations</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewRelationPage()}>
            <a>Create Relation</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <RelationsList />
        </Suspense>
      </div>
    </>
  )
}

RelationsPage.authenticate = true
RelationsPage.getLayout = (page) => <Layout>{page}</Layout>

export default RelationsPage
