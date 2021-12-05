import { getAntiCSRFToken, Image, Link, Routes } from "blitz"
import Button from "app/core/components/Button"
import { AnnotationIcon } from "@heroicons/react/outline"
import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment, useRef, useState } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import signInWithTwitter from "../../../public/sign_in_with_twitter.png"

const CTA = () => {
  const [isOpen, setIsOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const currentUser = useCurrentUser()

  return (
    <div className="bg-white dark:bg-gray-800 ">
      <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
          <span className="block">Having trouble managing your Twitter relationships?</span>
          <span className="block text-indigo-500">Feather can help.</span>
        </h2>
        <div className="lg:mt-0 lg:flex-shrink-0">
          <div className="mt-12 inline-flex rounded-md shadow">
            {currentUser && !userWaitlisted && (
              <Link href={Routes.SubscriptionsPage()}>
                <a className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  View Your Subscriptions
                </a>
              </Link>
            )}
            {!currentUser && (
              <Link href={Routes.SignupPage()}>
                <button
                  type="button"
                  className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Sign up for for free
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CTA
