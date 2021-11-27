import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createTweetCollection from "app/tweet-collections/mutations/createTweetCollection"
import {
  TweetCollectionForm,
  FORM_ERROR,
} from "app/tweet-collections/components/TweetCollectionForm"

const NewTweetCollectionPage: BlitzPage = () => {
  const router = useRouter()
  const [createTweetCollectionMutation] = useMutation(createTweetCollection)

  return (
    <div>
      <h1>Create New TweetCollection</h1>

      <TweetCollectionForm
        submitText="Create TweetCollection"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateTweetCollection}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const tweetCollection = await createTweetCollectionMutation(values)
            router.push(Routes.ShowTweetCollectionPage({ tweetCollectionId: tweetCollection.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.TweetCollectionsPage()}>
          <a>TweetCollections</a>
        </Link>
      </p>
    </div>
  )
}

NewTweetCollectionPage.authenticate = true
NewTweetCollectionPage.getLayout = (page) => (
  <Layout title={"Create New TweetCollection"}>{page}</Layout>
)

export default NewTweetCollectionPage
