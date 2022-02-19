import { useCurrentUser } from "../hooks/useCurrentUser"
import { ExclamationCircleIcon } from "@heroicons/react/solid"
import { useState } from "react"
import { getAntiCSRFToken, Routes, useMutation, useRouter } from "blitz"
import updateUserEmail from "../../users/mutations/updateUserEmail"
import SubscriptionBuilderPage from "../../pages/tools/subscription-builder"

const Welcome = () => {
  const antiCSRFToken = getAntiCSRFToken()

  const router = useRouter()
  const currentUser = useCurrentUser()
  const [emailError, setEmailError] = useState("")
  const [email, setEmail] = useState("")
  const [updateUserEmailMutation] = useMutation(updateUserEmail)

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleSaveEmail = async () => {
    if (email) {
      await window.fetch("/api/welcome/welcome", {
        method: "POST",
        credentials: "include",
        headers: {
          "anti-csrf": antiCSRFToken,
        },
        body: JSON.stringify({
          email,
        }),
      })
      await router.push(Routes.SubscriptionBuilderPage())
    }
  }

  return (
    <section>
      <section className="p-8 mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
        {currentUser && !currentUser.email ? (
          <>
            <h2>
              Feather sends you emails with links to custom twitter feeds. We currently support 3
              types of feeds.
            </h2>
            <ul role="list">
              <li>
                Personal Feeds - a feed of an individual account. Good for building strong
                relationships.
              </li>
              <li>
                Engagement Feed - a feed of the accounts that have interacted with you the most.
                Good for keeping track of current relationships/conversations.
              </li>
              <li>
                Custom Feed - a feed of accounts that you pick. You determine what accounts you want
                to see and how often.
              </li>
            </ul>
            <p>
              In order to send you your feeds, we need to get your email address. Please enter it
              below. Once you do, we&apos;ll send you one of each so you can see what they look
              like.
            </p>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="flex mt-1 relative rounded-md shadow-sm">
              <input
                type="email"
                name="email"
                id="email"
                className="flex pr-10 border-gray-300 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                placeholder="you@example.com"
                aria-invalid="true"
                aria-describedby="email-error"
                onChange={handleEmailChange}
                value={email}
              />

              <button
                type="button"
                className="ml-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                onClick={handleSaveEmail}
              >
                Save Email
              </button>
            </div>
          </>
        ) : (
          currentUser && (
            <>
              <h2>Welcome back {currentUser.name}!</h2>
              <p>We&apos;re glad you&apos;re back!</p>
            </>
          )
        )}
      </section>
    </section>
  )
}

export default Welcome
