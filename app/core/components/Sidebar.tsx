import { Link, Routes, useMutation } from "blitz"
import React, { Fragment } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import createCheckoutSession from "app/users/mutations/createCheckoutSession"
import customerPortal from "app/users/mutations/customerPortal"
import { loadStripe } from "@stripe/stripe-js"

const Sidebar = () => {
  const currentUser = useCurrentUser()
  const [createCheckoutSessionMutation] = useMutation(createCheckoutSession)
  const [customerPortalMutation] = useMutation(customerPortal)
  return (
    <div className="relative bg-white dark:bg-gray-800">
      <div className="flex flex-col sm:flex-row sm:justify-around">
        <div className="w-72 h-screen">
          <nav className="mt-10 px-6 ">
            {!currentUser && (
              <Fragment>
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
              </Fragment>
            )}
            {!currentUser?.twitterUsername && (
              <Fragment>
                <a href="/api/auth/twitter">Log In With Twitter</a>
              </Fragment>
            )}
            {currentUser?.twitterUsername && (
              <Fragment>
                <Link href={Routes.RelationshipPage()}>
                  <a
                    className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                    href="#"
                  >
                    <span className="mx-4 text-lg font-normal">Relationships</span>
                    <span className="flex-grow text-right"></span>
                  </a>
                </Link>
                <Link href={Routes.DirectMessagePage()}>
                  <a
                    className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                    href="#"
                  >
                    <span className="mx-4 text-lg font-normal">Direct Messages</span>
                    <span className="flex-grow text-right"></span>
                  </a>
                </Link>
              </Fragment>
            )}
            {/* {!currentUser?.price && (
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
            )}
            {currentUser?.price ? (
              <button
                className="button small"
                onClick={async () => {
                  const { url } = await customerPortalMutation()
                  window.location.href = url
                }}
              >
                Manage billing
              </button>
            ) : null} */}
          </nav>
        </div>
      </div>
    </div>
  )
}
export default Sidebar