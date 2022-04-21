import { ChevronDownIcon } from "@heroicons/react/solid"
import { getAntiCSRFToken, useQuery } from "blitz"
import getBoostRequestsForUser from "../../boost/queries/getBoostRequestsForUser"
import { format } from "date-fns"
import { useState } from "react"
const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
]

export default function AmplificationStatsTable() {
  const [boostRequests] = useQuery(getBoostRequestsForUser, {})
  const antiCSRFToken = getAntiCSRFToken()

  const [currentScores, setCurrentScores] = useState({})

  const handleFetchCurrentEngagmentScore = async (event) => {
    const tweetId = event.target.dataset.tweetId
    await window
      .fetch("/api/twitter/score-tweet", {
        method: "POST",
        credentials: "include",
        headers: {
          "anti-csrf": antiCSRFToken,
        },
        body: JSON.stringify({
          tweetId,
        }),
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setCurrentScores({
          ...currentScores,
          [tweetId]: json.score,
        })
        currentScores[tweetId] = json.score
        console.log(currentScores)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Amplification Requests</h1>
          <p className="mt-2 text-sm text-gray-700">
            Here are the most recent requests for amplification.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          {/*<button*/}
          {/*  type="button"*/}
          {/*  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"*/}
          {/*>*/}
          {/*  Add user*/}
          {/*</button>*/}
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      <a href="#" className="group inline-flex">
                        Date Requested
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          {/*<ChevronDownIcon className="h-5 w-5" aria-hidden="true" />*/}
                        </span>
                      </a>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      <a href="#" className="group inline-flex">
                        Author
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          {/*<ChevronDownIcon className="h-5 w-5" aria-hidden="true" />*/}
                        </span>
                      </a>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <a href="#" className="group inline-flex">
                        Tweet
                        <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                          {/*<ChevronDownIcon className="h-5 w-5" aria-hidden="true" />*/}
                        </span>
                      </a>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <a href="#" className="group inline-flex">
                        Engagement Score At Time of Boost Request
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          {/*<ChevronDownIcon*/}
                          {/*  className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"*/}
                          {/*  aria-hidden="true"*/}
                          {/*/>*/}
                        </span>
                      </a>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <a href="#" className="group inline-flex">
                        Current Engagement Score
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          {/*<ChevronDownIcon*/}
                          {/*  className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"*/}
                          {/*  aria-hidden="true"*/}
                          {/*/>*/}
                        </span>
                      </a>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {boostRequests.map((boostRequest) => (
                    <tr key={boostRequest.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {format(boostRequest.createdAt, "MM/dd/yyyy")}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {boostRequest.authorUsername}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {boostRequest.tweetMessage}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {boostRequest.engagementScore}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {!currentScores[boostRequest.boostedTweetId] && (
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                            data-tweet-id={boostRequest.boostedTweetId}
                            onClick={handleFetchCurrentEngagmentScore}
                          >
                            Get Current Score
                          </a>
                        )}
                        {currentScores[boostRequest.boostedTweetId] && (
                          <span className="">{currentScores[boostRequest.boostedTweetId]}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
