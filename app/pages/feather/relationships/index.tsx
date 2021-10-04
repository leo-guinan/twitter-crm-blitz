import React, { Suspense } from "react"
import { Head, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import Layout from "../layouts/Layout"

import getRelationshipsForUser from "app/relationships/queries/getRelationshipsForUser"

import { RelationshipsList } from "app/relationships/components/RelationshipList"
import { isUserWaitlisted } from "../../../core/hooks/isUserWaitlisted"

const ITEMS_PER_PAGE = 100

const RelationshipPage: BlitzPage = () => {
  const router = useRouter()
  const userWaitlisted = isUserWaitlisted()

  const page = Number(router.query.page) || 0
  const [{ relationships, hasMore }] = usePaginatedQuery(getRelationshipsForUser, {
    orderBy: { twitterUserId: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  return (
    <>
      <Head>
        <title>Relationships</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          {userWaitlisted && (
            <div>
              You&apos;re on the waitlist. We&apos;ll contact you soon. This is where your dashboard
              will be.
            </div>
          )}
          {!userWaitlisted && <RelationshipsList relationships={relationships} hasMore={hasMore} />}
        </Suspense>
      </div>
    </>
  )
}

RelationshipPage.authenticate = true
RelationshipPage.getLayout = (page) => <Layout>{page}</Layout>

export default RelationshipPage
