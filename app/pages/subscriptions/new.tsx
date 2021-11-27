import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createSubscription from "app/subscriptions/mutations/createSubscription"
import { SubscriptionForm, FORM_ERROR } from "app/subscriptions/components/SubscriptionForm"

const NewSubscriptionPage: BlitzPage = () => {
  const router = useRouter()
  const [createSubscriptionMutation] = useMutation(createSubscription)

  return (
    <div>
      <h1>Create New Subscription</h1>

      <SubscriptionForm
        submitText="Create Subscription"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateSubscription}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const subscription = await createSubscriptionMutation(values)
            router.push(Routes.ShowSubscriptionPage({ subscriptionId: subscription.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.SubscriptionsPage()}>
          <a>Subscriptions</a>
        </Link>
      </p>
    </div>
  )
}

NewSubscriptionPage.authenticate = true
NewSubscriptionPage.getLayout = (page) => <Layout title={"Create New Subscription"}>{page}</Layout>

export default NewSubscriptionPage
