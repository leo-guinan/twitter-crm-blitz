import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createDirectMessage from "app/direct-messages/mutations/createDirectMessage"
import { DirectMessageForm, FORM_ERROR } from "app/direct-messages/components/DirectMessageForm"

const NewDirectMessagePage: BlitzPage = () => {
  const router = useRouter()
  const [createDirectMessageMutation] = useMutation(createDirectMessage)

  return (
    <div>
      <h1>Create New DirectMessage</h1>

      <DirectMessageForm
        submitText="Create DirectMessage"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateDirectMessage}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const directMessage = await createDirectMessageMutation(values)
            router.push(Routes.ShowDirectMessagePage({ directMessageId: directMessage.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.DirectMessagesPage()}>
          <a>DirectMessages</a>
        </Link>
      </p>
    </div>
  )
}

NewDirectMessagePage.authenticate = true
NewDirectMessagePage.getLayout = (page) => (
  <Layout title={"Create New DirectMessage"}>{page}</Layout>
)

export default NewDirectMessagePage
