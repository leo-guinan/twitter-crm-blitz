import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getDirectMessage from "app/direct-messages/queries/getDirectMessage"
import deleteDirectMessage from "app/direct-messages/mutations/deleteDirectMessage"

export const DirectMessage = () => {
  const router = useRouter()
  const directMessageId = useParam("directMessageId", "number")
  const [deleteDirectMessageMutation] = useMutation(deleteDirectMessage)
  const [directMessage] = useQuery(getDirectMessage, { id: directMessageId })

  return (
    <>
      <Head>
        <title>DirectMessage {directMessage.id}</title>
      </Head>

      <div>
        <h1>DirectMessage {directMessage.id}</h1>
        <pre>{JSON.stringify(directMessage, null, 2)}</pre>

        <Link href={Routes.EditDirectMessagePage({ directMessageId: directMessage.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteDirectMessageMutation({ id: directMessage.id })
              router.push(Routes.DirectMessagesPage())
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

const ShowDirectMessagePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.DirectMessagesPage()}>
          <a>DirectMessages</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <DirectMessage />
      </Suspense>
    </div>
  )
}

ShowDirectMessagePage.authenticate = true
ShowDirectMessagePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowDirectMessagePage
