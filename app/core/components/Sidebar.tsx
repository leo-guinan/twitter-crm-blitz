import { getAntiCSRFToken, Link, Routes, useMutation } from "blitz"
import React, { Fragment } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import createCheckoutSession from "app/users/mutations/createCheckoutSession"
import customerPortal from "app/users/mutations/customerPortal"
import { loadStripe } from "@stripe/stripe-js"
import Button from "./Button"
import { GlobalRole } from "db"
import logout from "app/auth/mutations/logout"
import SubscriptionsPage from "../../pages/subscriptions"
import CommunitiesPage from "../../pages/communities"

const Sidebar = () => {
  const currentUser = useCurrentUser()

  const [logoutMutation] = useMutation(logout)
  const [createCheckoutSessionMutation] = useMutation(createCheckoutSession)
  const [customerPortalMutation] = useMutation(customerPortal)
  const prices = {
    basic: process.env.STRIPE_PRICE_ID_BASIC,
  }

  const handleClick = async (event) => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key missing")
    }
    if (!process.env.NEXT_PUBLIC_STRIPE_PRICE_ID) {
      throw new Error("Stripe publishable key missing")
    }
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    console.log("plan: " + process.env.STRIPE_PRICE_ID_BASIC)
    const { sessionId } = await createCheckoutSessionMutation({
      priceId: "price_1JTCKbDZsCqGNMsUTgXgaYyP",
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
  }

  return (
    <div className="relative bg-white dark:bg-gray-800">
      <div className="flex flex-col sm:flex-row sm:justify-around">
        <div className="w-72 h-screen">
          <nav className="mt-10 px-6 ">
            {!currentUser && (
              <Fragment>
                <Link href={Routes.SignupPage()}>
                  <a
                    className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                    href="#"
                  >
                    <span className="mx-4 text-lg font-normal">Sign Up</span>
                    <span className="flex-grow text-right"></span>
                  </a>
                </Link>
                <div></div>
                <Link href={Routes.LoginPage()}>
                  <a
                    className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                    href="#"
                  >
                    <span className="mx-4 text-lg font-normal">Login</span>
                    <span className="flex-grow text-right"></span>
                  </a>
                </Link>
              </Fragment>
            )}
            {currentUser &&
              !currentUser?.memberships[0]?.organization?.twitterAccounts[0]?.twitterId && (
                <Fragment>
                  <a
                    className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                    href="/api/auth/twitter"
                  >
                    <span className="mx-4 text-lg font-normal">Log In With Twitter</span>
                    <span className="flex-grow text-right"></span>
                  </a>
                </Fragment>
              )}
            {currentUser && (
              <Fragment>
                <Link href={Routes.SubscriptionsPage()}>
                  <a
                    className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                    href="#"
                  >
                    <span className="mx-4 text-lg font-normal">Subscriptions</span>
                    <span className="flex-grow text-right"></span>
                  </a>
                </Link>
                <a
                  className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                  href="#"
                  onClick={async () => {
                    const { url } = await customerPortalMutation()
                    window.location.href = url
                  }}
                >
                  <span className="mx-4 text-lg font-normal">Billing</span>
                  <span className="flex-grow text-right"></span>
                </a>
                <a
                  className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                  href="#"
                  onClick={async () => {
                    await logoutMutation()
                  }}
                >
                  <span className="mx-4 text-lg font-normal">Logout</span>
                  <span className="flex-grow text-right"></span>
                </a>
                {currentUser.role === GlobalRole.SUPERADMIN && (
                  <section>
                    <Link href={Routes.CommunitiesPage()}>
                      <a
                        className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                        href="#"
                      >
                        <span className="mx-4 text-lg font-normal">Communities</span>
                        <span className="flex-grow text-right"></span>
                      </a>
                    </Link>
                    <Link href={Routes.AdminHome()}>
                      <a
                        className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                        href="#"
                      >
                        <span className="mx-4 text-lg font-normal">Admin</span>
                        <span className="flex-grow text-right"></span>
                      </a>
                    </Link>
                  </section>
                )}
              </Fragment>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
export default Sidebar
