import React, { Suspense } from "react"
import { Head, usePaginatedQuery, useRouter, BlitzPage, useRouterQuery, useQuery } from "blitz"
import Layout from "../layouts/Layout"
import searchRelationships from "app/relationships/queries/searchRelationships"
import { RelationshipsList } from "app/relationships/components/RelationshipList"
const ITEMS_PER_PAGE = 100

const SearchPage: BlitzPage = () => {
  const query = useRouterQuery()
  const router = useRouter()

  const page = Number(router.query.page) || 0
  const [{ relationships, hasMore }] = useQuery(searchRelationships, {
    orderBy: { twitterUserId: "asc" },
    query: query.query,
  })
  return (
    <>
      <Head>
        <title>Relationships</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <RelationshipsList relationships={relationships} hasMore={false} />
        </Suspense>
      </div>
    </>
  )
}

SearchPage.authenticate = true
SearchPage.getLayout = (page) => <Layout>{page}</Layout>

export default SearchPage
