import PricingOption from "./PricingOption"
import createCheckoutSession from "app/users/mutations/createCheckoutSession"
import customerPortal from "app/users/mutations/customerPortal"
import { loadStripe } from "@stripe/stripe-js"
import { useMutation, useRouter, Routes } from "blitz"
import { CheckIcon } from "@heroicons/react/solid"

{
  /* {!currentUser?.price && (
              <button
                className="button small"
                onClick={
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
            ) : null} */
}
const Pricing = () => {
  const [createCheckoutSessionMutation] = useMutation(createCheckoutSession)
  const [customerPortalMutation] = useMutation(customerPortal)
  const tiers = [
    {
      name: "Free",
      description: "Basic plan. Keep track of your tweets amd one other person's.",
      priceMonthly: "0.00",
      href: "",
      includedFeatures: ["Subscribe to your own tweets.", "Add one personal subscription"],
    },
    {
      name: "Personal",
      description: "This plan is sufficient for the average person.",
      priceMonthly: "5.00",
      href: "",
      includedFeatures: ["Subscribe to up to 15 people in addition to yourself."],
    },
    {
      name: "Community",
      description:
        "This plan includes tools for building a community. Include up to 50 users in a community subscription.",
      priceMonthly: "10.00",
      href: "",
      includedFeatures: [
        "Tools to manage and grow community relationships",
        "Support up to 50 members in the community",
      ],
    },
    {
      name: "Professional",
      description: "This is for the pros. Community tools and unlimited subscriptions.",
      priceMonthly: "15.00",
      href: "",
      includedFeatures: [
        "Keep track of all your professional relationships.",
        "Use community tools to manage a variety of relationship types.",
      ],
    },
  ]
  const prices = {
    basic: process.env.STRIPE_PRICE_ID_BASIC,
    premium: process.env.STRIPE_PRICE_ID_PREMIUM,
    pro: process.env.STRIPE_PRICE_ID_PRO,
  }

  return (
    <>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">Pricing Plans</h1>
            <p className="mt-5 text-xl text-gray-500 sm:text-center">Start today for free.</p>
            <div className="relative self-center mt-6 bg-gray-100 rounded-lg p-0.5 flex sm:mt-8">
              <button
                type="button"
                className="relative w-1/2 bg-white border-gray-200 rounded-md shadow-sm py-2 text-sm font-medium text-gray-900 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8"
              >
                Monthly billing
              </button>
              <button
                type="button"
                className="ml-0.5 relative w-1/2 border border-transparent rounded-md py-2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8"
              >
                Yearly billing
              </button>
            </div>
          </div>
          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200"
              >
                <div className="p-6">
                  <h2 className="text-lg leading-6 font-medium text-gray-900">{tier.name}</h2>
                  <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${tier.priceMonthly}
                    </span>{" "}
                    <span className="text-base font-medium text-gray-500">/mo</span>
                  </p>
                  <a
                    href={tier.href}
                    className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                  >
                    Buy {tier.name}
                  </a>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
                    What&apos;s included
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {tier.includedFeatures.map((feature) => (
                      <li key={feature} className="flex space-x-3">
                        <CheckIcon
                          className="flex-shrink-0 h-5 w-5 text-green-500"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Pricing
