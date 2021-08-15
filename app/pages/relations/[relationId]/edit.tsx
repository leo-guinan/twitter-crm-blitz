import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRelation from "app/relations/queries/getRelation"
import updateRelation from "app/relations/mutations/updateRelation"
import { RelationForm, FORM_ERROR } from "app/relations/components/RelationForm"

export const EditRelation = () => {
  const router = useRouter()
  const relationId = useParam("relationId", "number")
  const [relation, { setQueryData }] = useQuery(
    getRelation,
    { id: relationId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateRelationMutation] = useMutation(updateRelation)

  return (
    <>
      <Head>
        <title>Edit Relation {relation.id}</title>
      </Head>

      <div>
        <h1>Edit Relation {relation.id}</h1>
        <pre>{JSON.stringify(relation)}</pre>

        <RelationForm
          submitText="Update Relation"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateRelation}
          initialValues={relation}
          onSubmit={async (values) => {
            try {
              const updated = await updateRelationMutation({
                id: relation.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowRelationPage({ relationId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditRelationPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditRelation />
      </Suspense>

      <p>
        <Link href={Routes.RelationsPage()}>
          <a>Relations</a>
        </Link>
      </p>
    </div>
  )
}

EditRelationPage.authenticate = true
EditRelationPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditRelationPage
