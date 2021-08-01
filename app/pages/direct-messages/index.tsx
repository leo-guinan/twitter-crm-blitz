import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getDirectMessages from "app/direct-messages/queries/getDirectMessages"

const ITEMS_PER_PAGE = 100

export const DirectMessagesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ directMessages, hasMore }] = usePaginatedQuery(getDirectMessages, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {directMessages.map((directMessage) => (
          <li key={directMessage.id}>
            <Link href={Routes.ShowDirectMessagePage({ directMessageId: directMessage.id })}>
              <a>{directMessage.message}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const DirectMessagesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>DirectMessages</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewDirectMessagePage()}>
            <a>Create DirectMessage</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <DirectMessagesList />
        </Suspense>
      </div>
    </>
  )
}

DirectMessagesPage.authenticate = true
DirectMessagesPage.getLayout = (page) => <Layout>{page}</Layout>

export default DirectMessagesPage
