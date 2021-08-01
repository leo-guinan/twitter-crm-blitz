import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getDirectMessage from "app/direct-messages/queries/getDirectMessage"
import updateDirectMessage from "app/direct-messages/mutations/updateDirectMessage"
import { DirectMessageForm, FORM_ERROR } from "app/direct-messages/components/DirectMessageForm"

export const EditDirectMessage = () => {
  const router = useRouter()
  const directMessageId = useParam("directMessageId", "number")
  const [directMessage, { setQueryData }] = useQuery(
    getDirectMessage,
    { id: directMessageId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateDirectMessageMutation] = useMutation(updateDirectMessage)

  return (
    <>
      <Head>
        <title>Edit DirectMessage {directMessage.id}</title>
      </Head>

      <div>
        <h1>Edit DirectMessage {directMessage.id}</h1>
        <pre>{JSON.stringify(directMessage)}</pre>

        <DirectMessageForm
          submitText="Update DirectMessage"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateDirectMessage}
          initialValues={directMessage}
          onSubmit={async (values) => {
            try {
              const updated = await updateDirectMessageMutation({
                id: directMessage.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowDirectMessagePage({ directMessageId: updated.id }))
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

const EditDirectMessagePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditDirectMessage />
      </Suspense>

      <p>
        <Link href={Routes.DirectMessagesPage()}>
          <a>DirectMessages</a>
        </Link>
      </p>
    </div>
  )
}

EditDirectMessagePage.authenticate = true
EditDirectMessagePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditDirectMessagePage
