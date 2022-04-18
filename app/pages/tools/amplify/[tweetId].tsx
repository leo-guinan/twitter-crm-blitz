import { Suspense } from "react"
import { BlitzPage, getAntiCSRFToken, useParam, useQuery, useRouter } from "blitz"
import Layout from "../../feather/layouts/Layout"
import Tweet from "../../../tweet-collections/components/Tweet"
import getTweet from "../../../tweets/queries/getTweet"
import hasUserAlreadyAmplifiedTweet from "../../../amplifier/queries/hasUserAlreadyAmplifiedTweet"

export const AmplifyTweetWrapper = () => {
  const router = useRouter()
  const antiCSRFToken = getAntiCSRFToken()

  const tweetId = useParam("tweetId", "string")

  const [tweet] = useQuery(getTweet, { tweetId })

  const [alreadyAmplified, { setQueryData }] = useQuery(hasUserAlreadyAmplifiedTweet, { tweetId })

  const handleAmplify = async () => {
    await window.fetch("/api/amplify/tweet", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
      body: JSON.stringify({
        tweetId,
      }),
    })
    setQueryData(true, { refetch: false })
  }

  return (
    <div className="flex">
      <Tweet tweet={tweet} />
      <div className="bg-gray-50 sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Boost This Tweet</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Here are the ways you can help amplify this tweet.</p>
          </div>
          <div className="mt-5 flex flex-col">
            {!alreadyAmplified && (
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm my-2"
                onClick={handleAmplify}
              >
                Request Amplification From Your Amplifiers
              </button>
            )}
            <a
              href={
                tweet.authorAccount
                  ? `https://twitter.com/${tweet.authorAccount.twitterUsername}/status/${tweet.tweetId}`
                  : ""
              }
              target="_blank"
              rel="noreferrer"
            >
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm my-2"
              >
                Interact With This Tweet On Twitter
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const AmplifyTweetPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AmplifyTweetWrapper />
      </Suspense>
    </div>
  )
}

AmplifyTweetPage.authenticate = false
AmplifyTweetPage.getLayout = (page) => <Layout>{page}</Layout>

export default AmplifyTweetPage
