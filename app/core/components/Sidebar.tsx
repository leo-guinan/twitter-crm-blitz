import { Link, Routes, useMutation } from "blitz"
import React, { Fragment } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import customerPortal from "app/users/mutations/customerPortal"
import { GlobalRole } from "db"
import logout from "app/auth/mutations/logout"
import FollowAccountPage from "../../pages/profile/[slug]"

const Sidebar = () => {
  const currentUser = useCurrentUser()

  const [logoutMutation] = useMutation(logout)
  const [customerPortalMutation] = useMutation(customerPortal)

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
                <h1>Social</h1>
                <Link href={Routes.SubscriptionsPage()}>
                  <a
                    className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                    href="#"
                  >
                    <span className="mx-4 text-lg font-normal">Subscriptions</span>
                    <span className="flex-grow text-right"></span>
                  </a>
                </Link>
                <Link href={Routes.SubscriptionBuilderPage()}>
                  <a
                    className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                    href="#"
                  >
                    <span className="mx-4 text-lg font-normal">Subscription Builder</span>
                    <span className="flex-grow text-right"></span>
                  </a>
                </Link>
                <h1>Media</h1>
                <Link href={Routes.AmplifiersPage()}>
                  <a
                    className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                    href="#"
                  >
                    <span className="mx-4 text-lg font-normal">Amplifiers</span>
                    <span className="flex-grow text-right"></span>
                  </a>
                </Link>
                <Link href={Routes.AnalyticsPage()}>
                  <a
                    className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                    href="#"
                  >
                    <span className="mx-4 text-lg font-normal">Analytics</span>
                    <span className="flex-grow text-right"></span>
                  </a>
                </Link>
                <h1>My Account</h1>
                {currentUser?.memberships[0]?.organization?.stripeCustomerId && (
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
                )}
                {currentUser?.memberships[0]?.organization?.twitterAccounts[0]?.slug && (
                  <Link
                    href={Routes.FollowAccountPage({
                      slug: currentUser.memberships[0].organization.twitterAccounts[0].slug,
                    })}
                  >
                    <a
                      className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                      href="#"
                    >
                      <span className="mx-4 text-lg font-normal">My Profile</span>
                      <span className="flex-grow text-right"></span>
                    </a>
                  </Link>
                )}
                {!currentUser?.memberships[0]?.organization?.twitterAccounts[0]?.slug &&
                  currentUser?.memberships[0]?.organization?.twitterAccounts[0]
                    ?.twitterUsername && (
                    <Link
                      href={Routes.FollowAccountPage({
                        slug: currentUser.memberships[0].organization.twitterAccounts[0]
                          .twitterUsername,
                      })}
                    >
                      <a
                        className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                        href="#"
                      >
                        <span className="mx-4 text-lg font-normal">My Profile</span>
                        <span className="flex-grow text-right"></span>
                      </a>
                    </Link>
                  )}
                {currentUser?.memberships[0]?.organization?.twitterAccounts[0] && (
                  <Link href={Routes.RecentTweetsPage()}>
                    <a
                      className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                      href="#"
                    >
                      <span className="mx-4 text-lg font-normal">Recent Tweets</span>
                      <span className="flex-grow text-right"></span>
                    </a>
                  </Link>
                )}

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
