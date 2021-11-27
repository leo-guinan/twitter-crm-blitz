import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSubscription from "app/subscriptions/queries/getSubscription"
import deleteSubscription from "app/subscriptions/mutations/deleteSubscription"

export const Subscription = () => {
  const router = useRouter()
  const subscriptionId = useParam("subscriptionId", "number")
  const [deleteSubscriptionMutation] = useMutation(deleteSubscription)
  const [subscription] = useQuery(getSubscription, { id: subscriptionId })

  return (
    <>
      <Head>
        <title>Subscription {subscription.id}</title>
      </Head>

      <div>
        <h1>Subscription {subscription.id}</h1>
        <pre>{JSON.stringify(subscription, null, 2)}</pre>

        <Link href={Routes.EditSubscriptionPage({ subscriptionId: subscription.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteSubscriptionMutation({ id: subscription.id })
              router.push(Routes.SubscriptionsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowSubscriptionPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.SubscriptionsPage()}>
          <a>Subscriptions</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Subscription />
      </Suspense>
    </div>
  )
}

ShowSubscriptionPage.authenticate = true
ShowSubscriptionPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowSubscriptionPage
