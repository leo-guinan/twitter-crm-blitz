import { BlitzPage, getAntiCSRFToken, useParam, useQuery } from "blitz"
import React, { Suspense, useState } from "react"
import Layout from "app/core/layouts/Layout"
import getTwitterAccountBySlug from "../../twitter-accounts/queries/getTwitterAccountBySlug"

export const FollowAccount = () => {
  const antiCSRFToken = getAntiCSRFToken()

  const slug = useParam("slug", "string")

  const [email, setEmail] = useState("")

  const [botDetect, setBotDetect] = useState("")

  const [subscribed, setSubscribed] = useState(false)

  const [twitterAccount] = useQuery(getTwitterAccountBySlug, {
    slug: slug,
  })

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleBotDetectChange = (event) => {
    setBotDetect(event.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (botDetect) return
    await window
      .fetch("/api/subscribe/user", {
        method: "POST",
        credentials: "include",
        headers: {
          "anti-csrf": antiCSRFToken,
        },
        body: JSON.stringify({
          email: email,
          slug,
        }),
      })
      .then(() => setSubscribed(true))
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="md:grid grid-cols-1 p-8">
      <div className="md:grid mx-auto border-2 p-8">
        <div className="flex space-x-2">
          <img
            className="inline-block h-14 w-14 rounded-full"
            src={twitterAccount.twitterProfilePictureUrl || ""}
            alt=""
          />
          <h1 className="text-lg leading-6 font-medium text-gray-900">
            {twitterAccount.twitterName}
          </h1>
          <div className="max-w-xl text-sm text-gray-500">{twitterAccount.twitterBio}</div>
        </div>
        <div className="my-4 py-4 md:flex">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Don&apos;t miss a tweet from {twitterAccount.twitterName}
              </h3>
              {!subscribed && (
                <>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Enter your email address</p>
                  </div>

                  <form className="mt-5 sm:flex sm:items-center" onSubmit={handleSubmit}>
                    <div className="w-full sm:max-w-xs">
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="you@example.com"
                        onChange={handleEmailChange}
                        value={email}
                      />
                    </div>
                    <div className="invisible">
                      <label htmlFor="botDetect" className="sr-only">
                        Bots answer this:
                      </label>
                      <input
                        type="text"
                        name="botDetect"
                        id="botDetect"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="You shouldn't see this"
                        onChange={handleBotDetectChange}
                        value={botDetect}
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Follow
                    </button>
                  </form>
                </>
              )}
              {subscribed && (
                <div className="mt-5">
                  <p>You are now subscribed to {twitterAccount.twitterName}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const FollowAccountPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <FollowAccount />
      </Suspense>
    </div>
  )
}

FollowAccountPage.authenticate = false
FollowAccountPage.getLayout = (page) => <Layout>{page}</Layout>

export default FollowAccountPage