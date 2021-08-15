import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createRelation from "app/relations/mutations/createRelation"
import { RelationForm, FORM_ERROR } from "app/relations/components/RelationForm"

const NewRelationPage: BlitzPage = () => {
  const router = useRouter()
  const [createRelationMutation] = useMutation(createRelation)

  return (
    <div>
      <h1>Create New Relation</h1>

      <RelationForm
        submitText="Create Relation"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateRelation}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const relation = await createRelationMutation(values)
            router.push(Routes.ShowRelationPage({ relationId: relation.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.RelationsPage()}>
          <a>Relations</a>
        </Link>
      </p>
    </div>
  )
}

NewRelationPage.authenticate = true
NewRelationPage.getLayout = (page) => <Layout title={"Create New Relation"}>{page}</Layout>

export default NewRelationPage
