import React, { Suspense, useState } from "react"
import {
  BlitzPage,
  getAntiCSRFToken,
  Head,
  useMutation,
  usePaginatedQuery,
  useQuery,
  useRouter,
} from "blitz"
import Layout from "app/pages/feather/layouts/Layout"
import getSubscriptions from "app/subscriptions/queries/getSubscriptions"
import { SubscriptionCadence } from "db"
import updateSubscription from "app/subscriptions/mutations/updateSubscription"
import isSubscribedToUser from "app/subscriptions/queries/isSubscribedToUser"
import getNumberOfActivePersonalSubscriptions from "../../subscriptions/queries/getNumberOfActivePersonalSubscriptions"
import topEngagedAccounts from "../../tweets/queries/topEngagedAccounts"
import isSubscribedToUsers from "../../subscriptions/queries/isSubscribedToUsers"
import { TrashIcon } from "@heroicons/react/solid"
import deleteSubscription from "../../subscriptions/mutations/deleteSubscription"

const ITEMS_PER_PAGE = 100

export const SubscriptionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0

  const [cadenceToSet, setCadenceToSet] = useState("")
  const [updateSubscriptionMutation] = useMutation(updateSubscription)
  const [deleteSubscriptionMutation] = useMutation(deleteSubscription)
  const [currentlyEditingSubscription, setCurrentlyEditingSubscription] = useState("")

  const [newSubscriptionName, setNewSubscriptionName] = useState("")
  const SUBSCRIPTION_CADENCES = {
    DAILY: SubscriptionCadence.DAILY,
    WEEKLY: SubscriptionCadence.WEEKLY,
  }

  const [{ subscriptions, hasMore }, { setQueryData }] = usePaginatedQuery(getSubscriptions, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const updateSubscriptionWithId = async (subscriptionId) => {
    await updateSubscriptionMutation({
      id: subscriptionId,
      name: newSubscriptionName,
      cadence: SUBSCRIPTION_CADENCES[cadenceToSet],
    })
    setCurrentlyEditingSubscription("")
  }

  const handleSaveSubscription = async () => {
    const sub = subscriptions.find((sub) => sub.id === parseInt(currentlyEditingSubscription))

    const newSubscriptions = [
      {
        id: parseInt(currentlyEditingSubscription),
        name: newSubscriptionName,
        cadence: SUBSCRIPTION_CADENCES[cadenceToSet],
        twitterAccounts: sub.twitterAccounts,
        type: sub.type,
        status: sub.status,
      },
      ...subscriptions.filter((sub) => sub.id !== parseInt(currentlyEditingSubscription)),
    ]
    await setQueryData({ subscriptions: newSubscriptions, hasMore }, { refetch: false })
    await updateSubscriptionWithId(parseInt(currentlyEditingSubscription))
  }

  const handleEditSubscription = (event) => {
    event.preventDefault()
    setCurrentlyEditingSubscription(event.target.dataset.subscriptionId)
    const editingSubscription = subscriptions.find(
      (sub) => sub.id === parseInt(event.target.dataset.subscriptionId)
    )
    setNewSubscriptionName(editingSubscription.name)
    setCadenceToSet(editingSubscription.cadence)
  }

  const handleSelectCadence = async (event) => {
    setCadenceToSet(event.target.value)
  }

  const handleUpdateSubscriptionName = (e) => {
    setNewSubscriptionName(e.target.value)
  }

  const handleDeleteSubscription = async (event) => {
    const subscriptionId = parseInt(currentlyEditingSubscription)
    console.log(subscriptionId)
    if (subscriptionId) {
      const newSubscriptions = subscriptions.filter((sub) => sub.id !== subscriptionId)
      await setQueryData({ subscriptions: newSubscriptions, hasMore }, { refetch: false })
      await deleteSubscriptionMutation({ id: subscriptionId })
    }
  }

  return (
    <div className="flex flex-col mt-6">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div className="grid grid-cols-7">
              <div className="col-span-7">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Subscription Type
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Cadence
                      </th>
                      <th scope="col" className="relative px-4 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subscriptions.map((subscription) => (
                      <tr key={subscription.id}>
                        {parseInt(currentlyEditingSubscription) === subscription.id && (
                          <>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={
                                      subscription?.twitterAccounts[0]?.twitterAccount
                                        ?.twitterProfilePictureUrl
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                                      <label
                                        htmlFor={`subscription_name_${subscription.id}`}
                                        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                                      >
                                        Name
                                      </label>
                                      <input
                                        type="text"
                                        name={`subscription_name_${subscription.id}`}
                                        id={`subscription_name_${subscription.id}`}
                                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                        value={newSubscriptionName}
                                        data-subscription-id={subscription.id}
                                        onChange={handleUpdateSubscriptionName}
                                        onBlur={handleSaveSubscription}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{subscription.type}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {subscription.status}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              <select
                                name={`subscription_${subscription.id}`}
                                onChange={handleSelectCadence}
                                defaultValue={subscription.cadence}
                              >
                                {Object.keys(SUBSCRIPTION_CADENCES).map((cadence) => (
                                  <option
                                    value={cadence}
                                    key={`subscription_${subscription.id}_${cadence}`}
                                  >
                                    {cadence}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button onClick={handleDeleteSubscription}>
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900 "
                                onClick={handleSaveSubscription}
                              >
                                Save
                              </a>
                            </td>
                          </>
                        )}
                        {parseInt(currentlyEditingSubscription) !== subscription.id &&
                          subscription.twitterAccounts && (
                            <>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <div className="flex -space-x-1 overflow-hidden">
                                      {subscription.twitterAccounts.map((twitterAccount) => (
                                        <img
                                          key={`${subscription.id}_${twitterAccount.twitterAccount.id}_image`}
                                          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                          src={
                                            twitterAccount.twitterAccount.twitterProfilePictureUrl
                                          }
                                          alt=""
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {subscription?.name}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{subscription.type}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {subscription.status}
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                {subscription.cadence}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a
                                  href="#"
                                  className="text-indigo-600 hover:text-indigo-900"
                                  data-subscription-id={subscription.id}
                                  onClick={handleEditSubscription}
                                >
                                  Edit
                                </a>
                              </td>
                            </>
                          )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SubscriptionsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Subscriptions</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <SubscriptionsList />
        </Suspense>
      </div>
    </>
  )
}

SubscriptionsPage.authenticate = true
SubscriptionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default SubscriptionsPage
