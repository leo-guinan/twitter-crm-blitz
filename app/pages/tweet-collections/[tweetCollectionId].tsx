import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "../feather/layouts/Layout"
import getTweetCollection from "app/tweet-collections/queries/getTweetCollection"
import deleteTweetCollection from "app/tweet-collections/mutations/deleteTweetCollection"

export const TweetCollection = () => {
  const router = useRouter()
  const tweetCollectionId = useParam("tweetCollectionId", "number")
  const [deleteTweetCollectionMutation] = useMutation(deleteTweetCollection)
  const [tweetCollection] = useQuery(getTweetCollection, { id: tweetCollectionId })

  return (
    <>
      <div className="grid grid-cols-1 gap-6 my-6 px-4 md:px-6 lg:px-8">
        {tweetCollection.tweets.map((tweet) => (
          <div className="max-w-xl mx-auto px-4 py-4 bg-white shadow-md rounded-lg" key={tweet.id}>
            <div className="py-2 flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <a
                  href="#"
                  className="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg"
                >
                  <img
                    className="rounded-full h-8 w-8 object-cover"
                    src={tweet.author.profilePictureUrl}
                    alt=""
                  />
                  <p className="ml-2 text-base font-medium">{tweet.author.name}</p>
                </a>
              </div>
              <div className="flex flex-row items-center">
                <p className="text-xs font-semibold text-gray-500">
                  {tweet.tweetCreatedAt.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-2"></div>
            <div className="py-2">
              <p className="leading-snug">{tweet.message}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

const ShowTweetCollectionPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TweetCollectionsPage()}>
          <a>TweetCollections</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <TweetCollection />
      </Suspense>
    </div>
  )
}

ShowTweetCollectionPage.authenticate = true
ShowTweetCollectionPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTweetCollectionPage
