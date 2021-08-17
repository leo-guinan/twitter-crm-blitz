import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTags from "app/tags/queries/getTags"

const ITEMS_PER_PAGE = 100

export const TagsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ tags, hasMore }] = usePaginatedQuery(getTags, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link href={Routes.ShowTagPage({ tagId: tag.id })}>
              <a>{tag.value}</a>
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

const TagsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Tags</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTagPage()}>
            <a>Create Tag</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TagsList />
        </Suspense>
      </div>
    </>
  )
}

TagsPage.authenticate = true
TagsPage.getLayout = (page) => <Layout>{page}</Layout>

export default TagsPage
