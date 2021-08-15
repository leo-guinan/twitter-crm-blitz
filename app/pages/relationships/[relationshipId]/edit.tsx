import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRelationship from "app/relationships/queries/getRelationship"
import updateRelationship from "app/relationships/mutations/updateRelationship"
import { RelationshipForm, FORM_ERROR } from "app/relationships/components/RelationshipForm"

export const EditRelationship = () => {
  const router = useRouter()
  const relationshipId = useParam("relationshipId", "number")
  const [relationship, { setQueryData }] = useQuery(
    getRelationship,
    { id: relationshipId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateRelationshipMutation] = useMutation(updateRelationship)

  return (
    <>
      <Head>
        <title>Edit Relationship {relationship.id}</title>
      </Head>

      <div>
        <h1>Edit Relationship {relationship.id}</h1>
        <pre>{JSON.stringify(relationship)}</pre>

        <RelationshipForm
          submitText="Update Relationship"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateRelationship}
          initialValues={relationship}
          onSubmit={async (values) => {
            try {
              const updated = await updateRelationshipMutation({
                id: relationship.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowRelationshipPage({ relationshipId: updated.id }))
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

const EditRelationshipPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditRelationship />
      </Suspense>

      <p>
        <Link href={Routes.RelationshipsPage()}>
          <a>Relationships</a>
        </Link>
      </p>
    </div>
  )
}

EditRelationshipPage.authenticate = true
EditRelationshipPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditRelationshipPage
