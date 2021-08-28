import React, { Fragment } from "react"
import { Link, Routes, useMutation } from "blitz"
import { useCurrentUser } from "../hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import DropDownMenu from "./DropDownMenu"

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
                  {/* <a
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/#contact"
                  >
                    Contact
                  </a> */}
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
            {/* <div className="-mr-2 flex md:hidden lg:hidden">

            </div> */}
          </div>
        </div>
        <div className="md:hidden lg:hidden flex justify-end">
          <DropDownMenu
            items={[
              {
                label: "Home",
              },
              {
                label: "Features",
              },
              {
                label: "Pricing",
              },
            ]}
          />
          {/* <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#"
            >

            </a>
            <a
              className="text-gray-300 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#features"
            >

            </a>
            <a
              className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#pricing"
            >
              Pricing
            </a>
            {/* <a
              className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#contact"
            >
              Contact
            </a> */}
          {/* </div> */}
        </div>
      </nav>
    </div>
  )
}
export default Header
