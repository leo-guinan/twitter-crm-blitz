import React, { Fragment } from "react"
import { Link, Routes, useMutation } from "blitz"
import { useCurrentUser } from "../hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

const Header = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  return (
    <nav className="flex bg-white flex-wrap items-center justify-between p-4">
      <div className="lg:order-2 w-auto lg:w-1/5 lg:text-center">
        <a className="text-xl text-gray-800 font-semibold font-heading" href="#">
          Twitter CRM
        </a>
      </div>
      <div className="block lg:hidden">
        <button className="navbar-burger flex items-center py-2 px-3 text-indigo-500 rounded border border-indigo-500">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
      <div className="navbar-menu hidden lg:order-1 lg:block w-full lg:w-2/5">
        <Link href={Routes.Home()}>
          <a
            className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-blue-900 hover:text-indigo-600"
            href="#"
          >
            Home
          </a>
        </Link>
        {currentUser && (
          <Fragment>
            <button
              className="button small"
              onClick={async () => {
                await logoutMutation()
              }}
            >
              Logout
            </button>
          </Fragment>
        )}
      </div>
    </nav>
  )
}
export default Header
