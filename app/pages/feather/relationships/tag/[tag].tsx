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
  useQuery,
} from "blitz"
import Layout from "../../layouts/Layout"
import getRelationships from "app/relationships/queries/getRelationships"
import Button from "app/core/components/Button"
import getRelationshipsForUser from "app/relationships/queries/getRelationshipsForUser"
import createTag from "app/tags/mutations/createTag"
import { faMinus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import deleteTag from "app/tags/mutations/deleteTag"
import { RelationshipsList } from "app/relationships/components/RelationshipList"
import { RelationshipType } from "db"
import getRelationshipsForUserWithTag from "app/relationships/queries/getRelationshipsForUserWithTag"
const ITEMS_PER_PAGE = 100

const RelationshipByTagPage: BlitzPage = () => {
  const router = useRouter()
  const tag = useParam("tag", "string")
  const [relationships] = useQuery(getRelationshipsForUserWithTag, { tag })
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

RelationshipByTagPage.authenticate = true
RelationshipByTagPage.getLayout = (page) => <Layout>{page}</Layout>

export default RelationshipByTagPage
