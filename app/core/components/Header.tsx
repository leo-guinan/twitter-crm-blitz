import React, { Fragment } from "react"
import { Link, Routes, useMutation } from "blitz"
import { useCurrentUser } from "../hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

const Header = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  return (
    <div>
      <nav className="bg-white dark:bg-gray-800  ">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className=" flex items-center">
              <a className="flex-shrink-0" href="/">
                <img src="/icon.png" alt="FeatherCRM" />
              </a>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/#"
                  >
                    Home
                  </a>
                  <a
                    className="text-gray-300 dark:text-white  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/#features"
                  >
                    Features
                  </a>
                  <a
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/#pricing"
                  >
                    Pricing
                  </a>
                  <a
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/#contact"
                  >
                    Contact
                  </a>
                  <span className="lg:flex-grow ml-auto">
                    {currentUser && (
                      <Link href={Routes.RelationshipPage()}>
                        <a className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                          Dashboard
                        </a>
                      </Link>
                    )}
                    {!currentUser && (
                      <span>
                        <Link href={Routes.SignupPage()}>
                          <a className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Signup
                          </a>
                        </Link>
                        <Link href={Routes.LoginPage()}>
                          <a className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Login
                          </a>
                        </Link>
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6"></div>
            </div>
            <div className="-mr-2 flex md:hidden lg:hidden">
              <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="h-8 w-8"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="md:hidden lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#"
            >
              Home
            </a>
            <a
              className="text-gray-300 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#features"
            >
              Features
            </a>
            <a
              className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#pricing"
            >
              Pricing
            </a>
            <a
              className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#contact"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Header
