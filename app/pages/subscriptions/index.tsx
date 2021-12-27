import React, { Suspense, useState } from "react"
import {
  BlitzPage,
  getAntiCSRFToken,
  Head,
  Routes,
  useMutation,
  usePaginatedQuery,
  useQuery,
  useRouter,
  Link,
} from "blitz"
import Layout from "app/pages/feather/layouts/Layout"
import getSubscriptions from "app/subscriptions/queries/getSubscriptions"
import Button from "../../core/components/Button"
import TwitterUserList from "../../twitter-user/components/TwitterUserList"
import { SubscriptionCadence } from "db"
import updateSubscription from "app/subscriptions/mutations/updateSubscription"
import isSubscribedToUser from "app/subscriptions/queries/isSubscribedToUser"
import getNumberOfActivePersonalSubscriptions from "../../subscriptions/queries/getNumberOfActivePersonalSubscriptions"
import { useCurrentOrganization } from "../../core/hooks/useCurrentOrganization"
import UpgradePlan from "../../core/components/UpgradePlan"
import AddEmailModal from "../../core/components/AddEmailModal"
import updateUserEmail from "../../users/mutations/updateUserEmail"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"
import topEngagedAccounts from "../../tweets/queries/topEngagedAccounts"
import isSubscribedToUsers from "../../subscriptions/queries/isSubscribedToUsers"

const ITEMS_PER_PAGE = 100

export const SubscriptionsList = () => {
  const antiCSRFToken = getAntiCSRFToken()
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const currentUser = useCurrentUser()

  const [openPlanModal, setOpenPlanModal] = useState(false)
  const [cadenceToSet, setCadenceToSet] = useState("")
  const [updateSubscriptionMutation] = useMutation(updateSubscription)
  const [twitterUserToLookup, setTwitterUserToLookup] = useState("")
  const [currentlyEditingSubscription, setCurrentlyEditingSubscription] = useState("")
  const [twitterUserToSubscribeTo, setTwitterUserToSubscribeTo] = useState({
    twitterId: "",
    twitterUsername: "",
    twitterName: "",
    twitterBio: "",
    twitterProfilePictureUrl: "",
  })

  const [email, setEmail] = useState("")
  const [emailNeeded, setEmailNeeded] = useState(!currentUser?.email)

  const [updateUserEmailMutation] = useMutation(updateUserEmail)

  const [recommendedAccounts] = useQuery(topEngagedAccounts, {})

  const saveEmail = async () => {
    if (email) {
      await updateUserEmailMutation({ email })
      setEmailNeeded(false)
    }
  }

  const [
    numberOfActivePersonalSubscriptions,
    { setQueryData: setNumberOfActivePersonalSubscriptions },
  ] = useQuery(getNumberOfActivePersonalSubscriptions, {})

  const [isUserSubscribedToTwitterUserToSubscribeTo, { setQueryData: setSubscribed }] = useQuery(
    isSubscribedToUser,
    { twitterId: twitterUserToSubscribeTo.twitterId }
  )

  const organization = useCurrentOrganization()

  const maxSubscriptionsReached =
    numberOfActivePersonalSubscriptions === organization!.plan!.personalSubscriptionQuota

  const maxSubscriptionsExceeded =
    numberOfActivePersonalSubscriptions > organization!.plan!.personalSubscriptionQuota

  const SUBSCRIPTION_CADENCES = {
    DAILY: SubscriptionCadence.DAILY,
    WEEKLY: SubscriptionCadence.WEEKLY,
  }

  const [{ subscriptions, hasMore }, { setQueryData }] = usePaginatedQuery(getSubscriptions, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const [engagedAccountsSubscribed] = useQuery(isSubscribedToUsers, {
    twitterIds: recommendedAccounts ? recommendedAccounts.map((account) => account.twitterId) : [],
  })

  const isSubscribedToTwitterUser = (twitterId) => {
    if (twitterId === twitterUserToSubscribeTo) {
      return isUserSubscribedToTwitterUserToSubscribeTo
    }
    return engagedAccountsSubscribed[twitterId]
  }

  const handleLookupUser = async () => {
    const response = await window
      .fetch("/api/twitter/lookup-user", {
        method: "POST",
        credentials: "include",
        headers: {
          "anti-csrf": antiCSRFToken,
        },
        body: JSON.stringify({
          twitterUsername: twitterUserToLookup,
        }),
      })
      .then((response) => response.json())
      .then((json) =>
        setTwitterUserToSubscribeTo({
          twitterId: json.twitterId,
          twitterUsername: json.twitterUsername,
          twitterName: json.twitterName,
          twitterBio: json.twitterBio,
          twitterProfilePictureUrl: json.twitterProfilePictureUrl,
        })
      )
  }

  const handleSubscribeToUser = async (event) => {
    let twitterAccountToSubscribeTo
    const twitterId = event.target.dataset.twitterId
    if (twitterId === twitterUserToSubscribeTo.twitterId) {
      twitterAccountToSubscribeTo = twitterUserToSubscribeTo
      setSubscribed(true, { refetch: false })
    } else if (recommendedAccounts) {
      twitterAccountToSubscribeTo = recommendedAccounts.find(
        (account) => account.twitterId === twitterId
      )
      engagedAccountsSubscribed[twitterId] = true
    }
    const newSubscription = {
      twitterUsers: [twitterAccountToSubscribeTo],
      name: `New Subscription`,
      id: "temp",
      type: "PERSONAL",
      status: "ACTIVE",
      cadence: "WEEKLY",
    }
    setQueryData(
      { subscriptions: [newSubscription, ...subscriptions], hasMore },
      { refetch: false }
    )

    await window.fetch("/api/twitter/subscribe-to-user", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
      body: JSON.stringify({
        twitterId,
      }),
    })
  }

  const updateSubscriptionWithId = async (subscriptionId) => {
    await updateSubscriptionMutation({
      id: subscriptionId,

      cadence: SUBSCRIPTION_CADENCES[cadenceToSet],
    })
    setCurrentlyEditingSubscription("")
  }

  const handleSaveSubscription = async (event) => {
    await updateSubscriptionWithId(parseInt(event.target.dataset.subscriptionId))
  }

  const handleEditSubscription = (event) => {
    setCurrentlyEditingSubscription(event.target.dataset.subscriptionId)
  }

  const handleSelectCadence = async (event) => {
    console.log(`setting cadence: ${event.target.value}`)
    setCadenceToSet(event.target.value)
  }

  const handleTwitterUserToLookupChange = (event) => {
    setTwitterUserToLookup(event.target.value)
  }

  const handleOpenPlanModal = () => {
    setOpenPlanModal(!openPlanModal)
  }

  return (
    <div>
      <section>
        <section>
          <div>
            <div className="border-2  m-4 w-full max-w-xs p-6 mx-auto">
              <input
                type="url"
                onChange={handleTwitterUserToLookupChange}
                value={twitterUserToLookup}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full block sm:text-sm border-gray-300 rounded-md"
                placeholder="feathercrm"
              />
              <Button
                onClick={handleLookupUser}
                label="Lookup Twitter User"
                color="red"
                className="grid-cols-1"
              />
              <p className="mt-2 text-sm text-gray-500" id="email-description">
                Enter the username to lookup..
              </p>
            </div>
          </div>
        </section>
        {twitterUserToSubscribeTo.twitterId && (
          <section className="border-2 mx-4 p-6">
            <TwitterUserList
              twitterUsers={[twitterUserToSubscribeTo]}
              actionHandler={handleSubscribeToUser}
              actionCTA="Subscribe"
              actionPerformed={isSubscribedToTwitterUser}
              view="standard"
            />
          </section>
        )}
      </section>
      <div>
        <div className="flex flex-col mt-6">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <span className={``}>
                  {maxSubscriptionsExceeded && (
                    <span className={`inline-block p-4 m-1 text-red-700`}>
                      You are over your subscription limit. Please deactivate some subscriptions or
                      <Link href={Routes.UpgradeProfilePage()}>
                        <a className="cursor-pointer underline"> upgrade your plan.</a>
                      </Link>
                    </span>
                  )}

                  {maxSubscriptionsReached && (
                    <span>
                      Maximum subscriptions reached.
                      <Link href={Routes.UpgradeProfilePage()}>
                        <a className="cursor-pointer underline">
                          Please upgrade your plan for more.
                        </a>
                      </Link>
                    </span>
                  )}

                  {!maxSubscriptionsExceeded && !maxSubscriptionsReached && (
                    <span>
                      {numberOfActivePersonalSubscriptions} /{" "}
                      {organization?.plan?.personalSubscriptionQuota} subscriptions used
                      <Link href={Routes.UpgradeProfilePage()}>
                        <a className="cursor-pointer underline"> (Upgrade your Plan).</a>
                      </Link>
                    </span>
                  )}
                </span>
                <div className="grid grid-cols-11">
                  <div className="col-span-7 mt-8">
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
                                        {
                                          subscription?.twitterAccounts[0]?.twitterAccount
                                            ?.twitterName
                                        }
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        {"@" +
                                          subscription?.twitterAccounts[0]?.twitterAccount
                                            ?.twitterUsername}
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
                                  <a
                                    href="#"
                                    className="text-indigo-600 hover:text-indigo-900"
                                    data-subscription-id={subscription.id}
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
                                          {
                                            subscription?.twitterAccounts[0]?.twitterAccount
                                              ?.twitterName
                                          }
                                        </div>
                                        <div className="text-sm text-gray-500">
                                          {"@" +
                                            subscription?.twitterAccounts[0]?.twitterAccount
                                              ?.twitterUsername}
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
                                    {/*<a*/}
                                    {/*  href="#"*/}
                                    {/*  className="text-indigo-600 hover:text-indigo-900"*/}
                                    {/*  data-subscription-id={subscription.id}*/}
                                    {/*  onClick={handleEditSubscription}*/}
                                    {/*>*/}
                                    {/*  Edit*/}
                                    {/*</a>*/}
                                  </td>
                                </>
                              )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="m-8 border-2 col-span-4 p-4">
                    <h2 className="w-full border-b-2 p-4 flex">
                      <span className="inline-block mx-auto">Most engagement</span>
                    </h2>
                    {recommendedAccounts && (
                      <>
                        <TwitterUserList
                          twitterUsers={recommendedAccounts}
                          actionHandler={handleSubscribeToUser}
                          actionCTA="Subscribe"
                          actionPerformed={isSubscribedToTwitterUser}
                          view="compact"
                        />
                      </>
                    )}
                    {!recommendedAccounts && (
                      <div className="text-center">
                        <div className="text-gray-500">No recommended accounts yet</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <UpgradePlan open={openPlanModal} setOpen={setOpenPlanModal} />
              <AddEmailModal
                email={email}
                setEmail={setEmail}
                open={emailNeeded}
                setOpen={setEmailNeeded}
                saveEmail={saveEmail}
              />
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
