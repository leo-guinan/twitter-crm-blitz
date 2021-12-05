import { Link, Routes, usePaginatedQuery, useRouter } from "blitz"
import getTweetCollections from "app/tweet-collections/queries/getTweetCollections"
import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/solid"

const ITEMS_PER_PAGE = 100
const TweetCollectionList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ tweetCollections, hasMore }] = usePaginatedQuery(getTweetCollections, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {tweetCollections.map((tweetCollection) => (
            <li key={tweetCollection.id}>
              <a href="#" className="block hover:bg-gray-50">
                <div className="px-4 py-4 flex items-center sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="truncate">
                      <div className="flex text-sm">
                        <p className="font-medium text-indigo-600 truncate">
                          {tweetCollection.name}
                        </p>
                        <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                          in {tweetCollection.id}
                        </p>
                      </div>
                      <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <p>
                            {/*Closing on <time dateTime={position.closeDate}>{position.closeDateFull}</time>*/}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                      <div className="flex overflow-hidden -space-x-1">
                        {/*{position.applicants.map((applicant) => (*/}
                        {/*  <img*/}
                        {/*    key={applicant.email}*/}
                        {/*    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"*/}
                        {/*    src={applicant.imageUrl}*/}
                        {/*    alt={applicant.name}*/}
                        {/*  />*/}
                        {/*))}*/}
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 flex-shrink-0">
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
              </a>
            </li>
            // <li key={}>
            //   <Link href={Routes.ShowTweetCollectionPage({ tweetCollectionId: tweetCollection.id })}>
            //     <a>{tweetCollection.id}: {tweetCollection.name}</a>
            //   </Link>
            // </li>
          ))}
        </ul>

        <button disabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </button>
        <button disabled={!hasMore} onClick={goToNextPage}>
          Next
        </button>
      </div>
    </div>
  )
}

export default TweetCollectionList
