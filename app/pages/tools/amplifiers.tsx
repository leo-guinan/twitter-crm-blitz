import LookupTwitterAccount from "../../twitter-accounts/components/LookupTwitterAccount"
import React, { useState } from "react"
import Layout from "../feather/layouts/Layout"
import TwitterUserList from "../../twitter-user/components/TwitterUserList"
import { SubscriptionCadence } from "db"
import { getAntiCSRFToken, Routes, useMutation, useRouter } from "blitz"
import createCheckoutSession from "../../users/mutations/createCheckoutSession"
import createSubscription from "../../subscriptions/mutations/createSubscription"

interface TwitterAccount {
  id: number
  twitterId: string
  twitterUsername: string
  twitterName: string
  twitterBio: string
  twitterProfilePictureUrl: string
}

const AmplifiersPage = () => {
  const antiCSRFToken = getAntiCSRFToken()
  const [twitterAccountsToSubscribeTo, setTwitterAccountsToSubscribeTo] = useState<
    TwitterAccount[]
  >([])
  const [createSubscriptionMutation] = useMutation(createSubscription)
  const router = useRouter()

  const [subscriptionName, setSubscriptionName] = useState("")
  const [subscriptionCadence, setSubscriptionCadence] = useState<SubscriptionCadence>(
    SubscriptionCadence.WEEKLY
  )

  const [twitterUserToLookup, setTwitterUserToLookup] = useState<TwitterAccount>({
    id: -1,
    twitterId: "",
    twitterUsername: "",
    twitterName: "",
    twitterBio: "",
    twitterProfilePictureUrl: "",
  })

  const refreshUser = async () => {
    await window
      .fetch("/api/twitter/refresh-user", {
        method: "POST",
        credentials: "include",
        headers: {
          "anti-csrf": antiCSRFToken,
        },
        body: JSON.stringify({
          twitterAccountTwitterId: twitterUserToLookup.twitterId,
        }),
      })
      .then((response) => response.json())
      .then((json) => {
        setTwitterUserToLookup(json)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleAddUserToList = async () => {
    await refreshUser()
    setTwitterAccountsToSubscribeTo([...twitterAccountsToSubscribeTo, twitterUserToLookup])
    setTwitterUserToLookup({
      id: -1,
      twitterId: "",
      twitterUsername: "",
      twitterName: "",
      twitterBio: "",
      twitterProfilePictureUrl: "",
    })
  }

  const handleRemoveUserFromList = (e) => {
    setTwitterAccountsToSubscribeTo(
      twitterAccountsToSubscribeTo.filter((user) => user.twitterId !== e.target.dataset.twitterId)
    )
  }

  const handleClear = () => {
    setTwitterAccountsToSubscribeTo([])
    setSubscriptionName("")
    setSubscriptionCadence(SubscriptionCadence.WEEKLY)
  }

  const handleSaveSubscription = async () => {
    try {
      console.log(twitterAccountsToSubscribeTo)
      await createSubscriptionMutation({
        name: subscriptionName,
        cadence: subscriptionCadence,
        twitterAccounts: twitterAccountsToSubscribeTo,
      })
      await router.push(Routes.SubscriptionsPage())
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <section id="lookupUser">
        <LookupTwitterAccount setTwitterAccount={setTwitterUserToLookup} />
        {twitterUserToLookup.twitterId && (
          <>
            <section className="border-2 mx-4 p-6">
              <TwitterUserList
                twitterUsers={[twitterUserToLookup]}
                actionHandler={handleAddUserToList}
                actionCTA="Add to List"
                actionPerformed={() => false}
                view="compact"
              />
            </section>
          </>
        )}
      </section>
      <section className="border-2 mx-4 p-6">
        <h2 className="border-b">Accounts to include in your subscription</h2>
        {twitterAccountsToSubscribeTo.length > 0 && (
          <>
            <section>
              <TwitterUserList
                twitterUsers={twitterAccountsToSubscribeTo}
                actionHandler={handleRemoveUserFromList}
                actionCTA="Remove from List"
                actionPerformed={() => false}
                view="compact"
              />
            </section>
          </>
        )}
        {twitterAccountsToSubscribeTo.length === 0 && (
          <p className="mx-auto">No accounts to include in your subscription</p>
        )}
      </section>
      <section className="border-2 mx-4 p-6 mt-4">
        <h2>Subscription Options</h2>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="street-address"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Subscription Name
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <input
              type="text"
              name="subscriptionName"
              id="subscription-name"
              value={subscriptionName}
              onChange={(e) => setSubscriptionName(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="My Subscription"
            />
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Subscription Cadence
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <select
              id="cadence"
              name="cadence"
              className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              value={subscriptionCadence}
              onChange={(e) => setSubscriptionCadence(e.target.value as SubscriptionCadence)}
            >
              <option value="">Select an option</option>
              <option value="DAILY">Daily</option>
              <option value="WEEKLY">Weekly</option>
            </select>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleSaveSubscription}
            >
              Save
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

AmplifiersPage.authenticate = true
AmplifiersPage.getLayout = (page) => <Layout>{page}</Layout>

export default AmplifiersPage
