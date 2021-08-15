import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRelationship from "app/relationships/queries/getRelationship"
import deleteRelationship from "app/relationships/mutations/deleteRelationship"

export const Relationship = () => {
  const router = useRouter()
  const relationshipId = useParam("relationshipId", "number")
  const [deleteRelationshipMutation] = useMutation(deleteRelationship)
  const [relationship] = useQuery(getRelationship, { id: relationshipId })

  return (
    <>
      <Head>
        <title>Relationship {relationship.id}</title>
      </Head>

      <div>
        <h1>Relationship {relationship.id}</h1>
        <pre>{JSON.stringify(relationship, null, 2)}</pre>

        <Link href={Routes.EditRelationshipPage({ relationshipId: relationship.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteRelationshipMutation({ id: relationship.id })
              router.push(Routes.RelationshipsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowRelationshipPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.RelationshipsPage()}>
          <a>Relationships</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Relationship />
      </Suspense>
    </div>
  )
}

ShowRelationshipPage.authenticate = true
ShowRelationshipPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRelationshipPage
