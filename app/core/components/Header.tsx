import React, { Fragment } from "react"
import { Routes, useMutation, Link } from "blitz"
import { useCurrentUser } from "../hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { Popover, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"

const Header = () => {
  const navigation = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Blog", href: "https://blog.feathercrm.io" },
    // { name: "Contact", href: "#" }
  ]

  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const items = currentUser
    ? [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Features",
          link: "/#features",
        },
        // {
        //   label: "Pricing",
        //   link: "/#pricing",
        // },
        {
          label: "Subscriptions",
          link: "/subscriptions",
        },
      ]
    : [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Features",
          link: "/#features",
        },
        // {
        //   label: "Pricing",
        //   link: "/#pricing",
        // },
      ]
  return (
    <div>
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Popover>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav
              className="relative flex items-center justify-between sm:h-10 md:justify-center"
              aria-label="Global"
            >
              <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <a href="#">
                    <span className="sr-only">Workflow</span>
                    <img className="h-8 w-auto sm:h-10" src="/logo.svg" alt="FeatherCRM" />
                  </a>
                  <div className="-mr-2 flex items-center md:hidden">
                    <Popover.Button className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Open main menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:space-x-10">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="font-medium text-gray-500 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
                {currentUser && (
                  <Link href={Routes.SubscriptionsPage()}>
                    <a className="font-medium text-gray-500 hover:text-gray-900">My Dashboard</a>
                  </Link>
                )}
              </div>
              {!currentUser && (
                <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                  <span className="inline-flex rounded-md shadow">
                    <a
                      href="/api/auth/twitter"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500"
                    >
                      Log in
                    </a>
                  </span>
                </div>
              )}
              {currentUser && (
                <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                  <span className="inline-flex rounded-md shadow">
                    <a
                      onClick={async () => {
                        await logoutMutation()
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500"
                    >
                      Log out
                    </a>
                  </span>
                </div>
              )}
            </nav>
          </div>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt=""
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close main menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                  {currentUser && (
                    <Link href={Routes.SubscriptionsPage()}>
                      <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                        My Dashboard
                      </a>
                    </Link>
                  )}
                </div>
                {!currentUser && (
                  <a
                    href="/api/auth/twitter"
                    className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100 hover:text-indigo-700"
                  >
                    Log in
                  </a>
                )}
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </div>
  )
}
export default Header
