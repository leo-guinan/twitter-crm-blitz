import { BlitzPage, getAntiCSRFToken, useParam, useQuery, useRouter } from "blitz"
import React, { Suspense } from "react"
import Layout from "app/core/layouts/Layout"
import getCommunityBySlug from "../../../communities/queries/getCommunityBySlug"
import TwitterUserList from "../../../twitter-user/components/TwitterUserList"

export const FollowCommuniy = () => {
  const antiCSRFToken = getAntiCSRFToken()

  const router = useRouter()
  const slug = useParam("slug", "string")

  const [community] = useQuery(getCommunityBySlug, { slug: slug })

  return (
    <div className="md:grid grid-cols-2 p-8">
      <div className="md:grid mx-auto">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">{community.name}</h1>
          <div className="max-w-xl text-sm text-gray-500">{community.description}</div>
        </div>
        <div className="my-4 py-4 md:flex">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Follow the community</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Enter your email address</p>
              </div>
              <form className="mt-5 sm:flex sm:items-center">
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
                  />
                </div>
                <button
                  type="submit"
                  className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Follow
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="grid border-2 p-8">
        <h1 className="border-b-2">Featuring Tweets By</h1>

        <TwitterUserList
          twitterUsers={community.communityMembers.map((member) => member.account)}
          actionCTA="View Profile"
          actionHandler={() => console.log("something")}
          actionPerformed={() => false}
          view="compact"
        />
      </div>
    </div>
  )
}

const FollowCommunityPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <FollowCommuniy />
      </Suspense>
    </div>
  )
}

FollowCommunityPage.authenticate = false
FollowCommunityPage.getLayout = (page) => <Layout>{page}</Layout>

export default FollowCommunityPage
