import React, { Suspense, useState } from "react"
import {
  Head,
  Link,
  usePaginatedQuery,
  useRouter,
  BlitzPage,
  Routes,
  useMutation,
  useParam,
} from "blitz"
import Layout from "../layouts/Layout"
import getRelationships from "app/relationships/queries/getRelationships"
import Button from "app/core/components/Button"
import getRelationshipsByType from "app/relationships/queries/getRelationshipsByType"
import createTag from "app/tags/mutations/createTag"
import { faMinus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import deleteTag from "app/tags/mutations/deleteTag"
import { RelationshipsList } from "app/relationships/components/RelationshipList"
import { RelationshipType } from "db"
const ITEMS_PER_PAGE = 100

const RelationshipByTypePage: BlitzPage = () => {
  const typesToEnum = {
    follower: RelationshipType.FOLLOWER,
    following: RelationshipType.FOLLOWING,
    mutual: RelationshipType.MUTUAL,
  }
  const router = useRouter()
  const type = useParam("type", "string")
  const page = Number(router.query.page) || 0
  const [{ relationships, hasMore }] = usePaginatedQuery(getRelationshipsByType, {
    orderBy: { twitterUserId: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
    type,
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

RelationshipByTypePage.authenticate = true
RelationshipByTypePage.getLayout = (page) => <Layout>{page}</Layout>

export default RelationshipByTypePage
