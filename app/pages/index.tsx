import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import { loadStripe } from "@stripe/stripe-js"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import createCheckoutSession from "app/users/mutations/createCheckoutSession"
import customerPortal from "app/users/mutations/customerPortal"
import { getAntiCSRFToken } from "blitz"
import Button from "app/core/components/Button"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const [createCheckoutSessionMutation] = useMutation(createCheckoutSession)
  const [customerPortalMutation] = useMutation(customerPortal)
  const handlePopulateFollowers = async () => {
    const antiCSRFToken = getAntiCSRFToken()
    const response = await window.fetch("/api/twitter/populate", {
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
    })
    console.log(response)
  }
  const handleSendDirectMessages = async () => {
    const antiCSRFToken = getAntiCSRFToken()
    const response = await window.fetch("/api/twitter/send-direct-message", {
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
    })
    console.log(response)
  }

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <button
          className="button small"
          onClick={async () => {
            if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
              throw new Error("Stripe publishable key missing")
            }
            if (!process.env.NEXT_PUBLIC_STRIPE_PRICE_ID) {
              throw new Error("Stripe publishable key missing")
            }
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
            const { sessionId } = await createCheckoutSessionMutation({
              priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
            })
            if (!stripe) {
              throw new Error("Stripe could not be loaded")
            }
            const result = await stripe.redirectToCheckout({
              sessionId,
            })
            if (result.error) {
              console.error(result.error.message)
            }
          }}
        >
          Subscribe
        </button>
        {currentUser.price ? (
          <button
            className="button small"
            onClick={async () => {
              const { url } = await customerPortalMutation()
              window.location.href = url
            }}
          >
            Manage billing
          </button>
        ) : null}
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
          <br />
          Subscription status: <code>{currentUser.subscriptionStatus}</code>
          <br />
          {!currentUser.twitterUsername && <a href="/api/auth/twitter">Log In With Twitter</a>}
          {currentUser.twitterUsername && (
            <section>
              User Twitter Info: <span>{currentUser.twitterUsername}</span>
              <div>
                <a className="button small">
                  <strong>Followers</strong>
                </a>
              </div>
              <div>
                <a className="button small">
                  <strong>Direct Messages</strong>
                </a>
              </div>
              <div>
                <Button onClick={handlePopulateFollowers} color="blue" label="Populate Followers" />
              </div>
              <div>
                <Button
                  onClick={handleSendDirectMessages}
                  color="blue"
                  label="Send a direct message"
                />
              </div>
            </section>
          )}
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <div></div>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div>
      <h1>Twitter CRM</h1>

      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
