import LookupTwitterAccount from "../../twitter-accounts/components/LookupTwitterAccount"
import React, { useState } from "react"
import Layout from "../feather/layouts/Layout"
import TwitterUserList from "../../twitter-user/components/TwitterUserList"

interface TwitterAccount {
  id: ""
  twitterId: ""
  twitterUsername: ""
  twitterName: ""
  twitterBio: ""
  twitterProfilePictureUrl: ""
}

const SubscriptionBuilderPage = () => {
  const [twitterAccountsToSubscribeTo, setTwitterAccountsToSubscribeTo] = useState<
    TwitterAccount[]
  >([])

  const [twitterUserToLookup, setTwitterUserToLookup] = useState<TwitterAccount>({
    id: "",
    twitterId: "",
    twitterUsername: "",
    twitterName: "",
    twitterBio: "",
    twitterProfilePictureUrl: "",
  })

  const handleAddUserToList = () => {
    setTwitterAccountsToSubscribeTo([...twitterAccountsToSubscribeTo, twitterUserToLookup])
    setTwitterUserToLookup({
      id: "",
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

  return (
    <>
      <h1 className="flex w-1/4 mx-auto">Subscription Builder</h1>
      <h2 className="flex w-1/4 mx-auto">Build a custom Feather subscription</h2>
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
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Subscription Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="subscriptionName"
              id="subscription-name"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="My Subscription"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Subscription Cadence
          </label>
          <div className="mt-1">
            <select
              name="subscription-cadence"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option value="">Select an option</option>
              <option value="DAILY">Daily</option>
              <option value="WEEKLY">Weekly</option>
            </select>
          </div>
        </div>
      </section>
    </>
  )
}

SubscriptionBuilderPage.authenticate = true
SubscriptionBuilderPage.getLayout = (page) => <Layout>{page}</Layout>

export default SubscriptionBuilderPage
