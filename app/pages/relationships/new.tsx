import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createRelationship from "app/relationships/mutations/createRelationship"
import { RelationshipForm, FORM_ERROR } from "app/relationships/components/RelationshipForm"

const NewRelationshipPage: BlitzPage = () => {
  const router = useRouter()
  const [createRelationshipMutation] = useMutation(createRelationship)

  return (
    <div>
      <h1>Create New Relationship</h1>

      <RelationshipForm
        submitText="Create Relationship"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateRelationship}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const relationship = await createRelationshipMutation(values)
            router.push(Routes.ShowRelationshipPage({ relationshipId: relationship.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.RelationshipsPage()}>
          <a>Relationships</a>
        </Link>
      </p>
    </div>
  )
}

NewRelationshipPage.authenticate = true
NewRelationshipPage.getLayout = (page) => <Layout title={"Create New Relationship"}>{page}</Layout>

export default NewRelationshipPage
