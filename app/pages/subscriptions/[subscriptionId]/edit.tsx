import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSubscription from "app/subscriptions/queries/getSubscription"
import updateSubscription from "app/subscriptions/mutations/updateSubscription"
import { SubscriptionForm, FORM_ERROR } from "app/subscriptions/components/SubscriptionForm"

export const EditSubscription = () => {
  const router = useRouter()
  const subscriptionId = useParam("subscriptionId", "number")
  const [subscription, { setQueryData }] = useQuery(
    getSubscription,
    { id: subscriptionId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateSubscriptionMutation] = useMutation(updateSubscription)

  return (
    <>
      <Head>
        <title>Edit Subscription {subscription.id}</title>
      </Head>

      <div>
        <h1>Edit Subscription {subscription.id}</h1>
        <pre>{JSON.stringify(subscription, null, 2)}</pre>

        <SubscriptionForm
          submitText="Update Subscription"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateSubscription}
          initialValues={subscription}
          onSubmit={async (values) => {
            try {
              const updated = await updateSubscriptionMutation({
                id: subscription.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowSubscriptionPage({ subscriptionId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditSubscriptionPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditSubscription />
      </Suspense>

      <p>
        <Link href={Routes.SubscriptionsPage()}>
          <a>Subscriptions</a>
        </Link>
      </p>
    </div>
  )
}

EditSubscriptionPage.authenticate = true
EditSubscriptionPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditSubscriptionPage
