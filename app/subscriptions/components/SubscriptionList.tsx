import { Link, Routes, usePaginatedQuery, useRouter } from "blitz"
import getTweetCollections from "app/tweet-collections/queries/getTweetCollections"
import getSubscriptions from "../queries/getSubscriptions"
import Subscription from "./Subscription"

const ITEMS_PER_PAGE = 100

interface ISubscriptionList {
  handleSelectSubscription: (event) => void
}

const SubscriptionList = (props: ISubscriptionList) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ subscriptions, hasMore }] = usePaginatedQuery(getSubscriptions, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {subscriptions.map((subscription) => (
          <Subscription
            subscription={subscription}
            handleSelectSubscription={props.handleSelectSubscription}
            key={subscription.id}
          />
          // <li key={subscription.id}>
          //   <Link href={Routes.ShowSubscriptionPage({ subscriptionId: subscription.id })}>
          //     <a>{subscription.id}</a>
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
  )
}

export default SubscriptionList
