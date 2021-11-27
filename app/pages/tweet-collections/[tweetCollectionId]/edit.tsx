import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTweetCollection from "app/tweet-collections/queries/getTweetCollection"
import updateTweetCollection from "app/tweet-collections/mutations/updateTweetCollection"
import {
  TweetCollectionForm,
  FORM_ERROR,
} from "app/tweet-collections/components/TweetCollectionForm"

export const EditTweetCollection = () => {
  const router = useRouter()
  const tweetCollectionId = useParam("tweetCollectionId", "number")
  const [tweetCollection, { setQueryData }] = useQuery(
    getTweetCollection,
    { id: tweetCollectionId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTweetCollectionMutation] = useMutation(updateTweetCollection)

  return (
    <>
      <Head>
        <title>Edit TweetCollection {tweetCollection.id}</title>
      </Head>

      <div>
        <h1>Edit TweetCollection {tweetCollection.id}</h1>
        <pre>{JSON.stringify(tweetCollection, null, 2)}</pre>

        <TweetCollectionForm
          submitText="Update TweetCollection"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateTweetCollection}
          initialValues={tweetCollection}
          onSubmit={async (values) => {
            try {
              const updated = await updateTweetCollectionMutation({
                id: tweetCollection.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowTweetCollectionPage({ tweetCollectionId: updated.id }))
            } catch (error: any) {
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

const EditTweetCollectionPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTweetCollection />
      </Suspense>

      <p>
        <Link href={Routes.TweetCollectionsPage()}>
          <a>TweetCollections</a>
        </Link>
      </p>
    </div>
  )
}

EditTweetCollectionPage.authenticate = true
EditTweetCollectionPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTweetCollectionPage
