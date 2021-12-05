import { getAntiCSRFToken, Image, Link, Routes } from "blitz"
import Button from "app/core/components/Button"
import { AnnotationIcon } from "@heroicons/react/outline"
import { Dialog, Transition } from "@headlessui/react"
import React, { ChangeEvent, Fragment, useRef, useState } from "react"
import { isUserWaitlisted } from "../hooks/isUserWaitlisted"
import { useCurrentUser } from "../hooks/useCurrentUser"
import signInWithTwitter from "../../../public/sign_in_with_twitter.png"

const CTA = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const cancelButtonRef = useRef(null)
  const antiCSRFToken = getAntiCSRFToken()
  const [submitted, setSubmitted] = useState(false)
  const userWaitlisted = isUserWaitlisted()
  const currentUser = useCurrentUser()

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const emailForm = (
    <div className="mt-2">
      <p className="text-sm text-gray-500">
        <Fragment>
          <a
            className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
            href="/api/auth/twitter"
          >
            <Image src={signInWithTwitter} />
          </a>
        </Fragment>
      </p>
    </div>
  )

  const thankYou = (
    <div className="mt-2">
      <p className="text-sm text-gray-500">
        <span>Thanks for signing up!</span>
      </p>
    </div>
  )

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
            {currentUser && userWaitlisted && (
              <span>Thanks for signing up! We&apos;ll contact you soon!</span>
            )}
            {!currentUser && (
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Sign up for the Waiting List
              </button>
            )}

            <Transition.Root show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                auto-reopen="true"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={setIsOpen}
              >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="easfollowinge-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>

                  {/* This element is to trick the browser into centering the modal contents. */}
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <AnnotationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                          </div>
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-lg leading-6 font-medium text-gray-900"
                            >
                              Sign up for the Waiting List!
                            </Dialog.Title>
                            {!submitted && emailForm}
                            {submitted && thankYou}
                          </div>
                        </div>
                        {!submitted && (
                          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <Button
                              onClick={() => setIsOpen(false)}
                              // ref={cancelButtonRef}
                              label="Cancel"
                              color="red"
                            />
                          </div>
                        )}
                        {submitted && (
                          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <Button
                              onClick={() => setIsOpen(false)}
                              // ref={cancelButtonRef}
                              label="Close"
                              color="blue"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CTA
