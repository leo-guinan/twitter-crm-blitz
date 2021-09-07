import React, { Suspense, useState } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes, useMutation } from "blitz"
import Layout from "../layouts/Layout"
import getRelationships from "app/relationships/queries/getRelationships"
import Button from "app/core/components/Button"
import getRelationshipsForUser from "app/relationships/queries/getRelationshipsForUser"
import createTag from "app/tags/mutations/createTag"
import { faMinus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import deleteTag from "app/tags/mutations/deleteTag"
import { RelationshipsList } from "app/relationships/components/RelationshipList"
const ITEMS_PER_PAGE = 100

const RelationshipPage: BlitzPage = () => {
  const router = useRouter()

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
          <RelationshipsList relationships={relationships} hasMore={hasMore} />
        </Suspense>
      </div>
    </>
  )
}

RelationshipPage.authenticate = true
RelationshipPage.getLayout = (page) => <Layout>{page}</Layout>

export default RelationshipPage
