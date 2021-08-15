import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRelation from "app/relations/queries/getRelation"
import deleteRelation from "app/relations/mutations/deleteRelation"

export const Relation = () => {
  const router = useRouter()
  const relationId = useParam("relationId", "number")
  const [deleteRelationMutation] = useMutation(deleteRelation)
  const [relation] = useQuery(getRelation, { id: relationId })

  return (
    <>
      <Head>
        <title>Relation {relation.id}</title>
      </Head>

      <div>
        <h1>Relation {relation.id}</h1>
        <pre>{JSON.stringify(relation, null, 2)}</pre>

        <Link href={Routes.EditRelationPage({ relationId: relation.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteRelationMutation({ id: relation.id })
              router.push(Routes.RelationsPage())
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

const ShowRelationPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.RelationsPage()}>
          <a>Relations</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Relation />
      </Suspense>
    </div>
  )
}

ShowRelationPage.authenticate = true
ShowRelationPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRelationPage
