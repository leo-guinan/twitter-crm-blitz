import { Suspense, useState } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/pages/feather/layouts/Layout"
import getTweetCollections from "app/tweet-collections/queries/getTweetCollections"
import Tool from "../../core/components/Tool"
import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/solid"
import TweetCollectionList from "../../tweet-collections/components/TweetCollectionList"
import SubscriptionList from "../../subscriptions/components/SubscriptionList"
import TweetCollection from "../../tweet-collections/components/TweetCollection"

const ITEMS_PER_PAGE = 100

const MePage: BlitzPage = () => {
  const [selectedTwitterCollection, setSelectedTwitterCollection] = useState(0)
  const [selectedSubscription, setSelectedSubscription] = useState(0)

  const handleSelectSubscription = (event) => {
    console.log(`Changing subscription to: ${event.target.dataset.subscriptionId}`)
    setSelectedSubscription(event.target.dataset.subscriptionId)
  }

  return (
    <>
      <Head>
        <title>TweetCollections</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Tool>
            <section className="grid grid-flow-row">
              <section className="col-span-4">Top</section>
              <section className="grid grid-flow-col col-span-6">
                <section className="col-span-2">
                  <SubscriptionList handleSelectSubscription={handleSelectSubscription} />
                </section>
                <section className="col-span-2">
                  <TweetCollectionList />
                </section>
                <section className="col-span-2">
                  <TweetCollection tweets={[]} />
                </section>
              </section>
            </section>
          </Tool>
        </Suspense>
      </div>
    </>
  )
}

MePage.authenticate = true
MePage.getLayout = (page) => <Layout>{page}</Layout>

export default MePage
