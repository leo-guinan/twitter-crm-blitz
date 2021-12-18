import createCheckoutSession from "app/users/mutations/createCheckoutSession"
import customerPortal from "app/users/mutations/customerPortal"
import { loadStripe } from "@stripe/stripe-js"
import { useMutation, useQuery } from "blitz"
import { CheckIcon } from "@heroicons/react/solid"
import { useState } from "react"
import getPlans from "../../plan/queries/getPlans"

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
  const [currentPlanSelected, setCurrentPlanSelected] = useState("Annual")

  const [plans] = useQuery(getPlans, {})

  const activeButtonClasses =
    "bg-white border-gray-200 rounded-md shadow-sm py-2 text-sm font-medium text-gray-900 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8"
  const inactiveButtonClasses =
    "border border-transparent rounded-md py-2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8"

  const getFeatures = (type) => {
    const features = {
      FREE: ["Subscribe to your own tweets.", "Add one personal subscription"],
      PERSONAL: ["Subscribe to up to 15 additional people."],
      COMMUNITY: [
        "Tools to manage and grow community relationships",
        "Support up to 50 members in the community",
      ],
      PROFESSIONAL: [
        "Keep track of all your professional relationships.",
        "Use community tools to manage a variety of relationship types.",
        "Unlimited relationships and communities.",
      ],
    }
    return features[type]
  }

  const handleClick = async (event) => {
    event.preventDefault()
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key missing")
    }
    if (!process.env.NEXT_PUBLIC_STRIPE_PRICE_ID) {
      throw new Error("Stripe publishable key missing")
    }
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    const planToSubscribeTo = plans.find((plan) => plan.id == event.target.dataset.plan)
    console.log(JSON.stringify(planToSubscribeTo))
    // console.log("plan: " + prices[event.target.dataset.plan])
    if (!planToSubscribeTo!.stripeMonthlyPlanId || !planToSubscribeTo!.stripeAnnualPlanId) return
    let lineItem = {
      priceId:
        currentPlanSelected === "Monthly"
          ? planToSubscribeTo!.stripeMonthlyPlanId
          : planToSubscribeTo!.stripeAnnualPlanId,
      quantity: 1,
    }

    const { sessionId } = await createCheckoutSessionMutation(lineItem)
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
    <>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">Pricing Plans</h1>
            <p className="mt-5 text-xl text-gray-500 sm:text-center">Start today for free.</p>
            <div className="relative self-center mt-6 bg-gray-100 rounded-lg p-0.5 flex sm:mt-8">
              <button
                type="button"
                className={`relative w-1/2 ${
                  currentPlanSelected === "Monthly" ? activeButtonClasses : inactiveButtonClasses
                }`}
                onClick={() => setCurrentPlanSelected("Monthly")}
              >
                Monthly billing
              </button>
              <button
                type="button"
                className={`ml-0.5 relative w-1/2 ${
                  currentPlanSelected === "Annual" ? activeButtonClasses : inactiveButtonClasses
                }`}
                onClick={() => setCurrentPlanSelected("Annual")}
              >
                Yearly billing
              </button>
            </div>
          </div>
          {/*  name           String         @unique
  description    String
  monthlyPrice   Decimal        @default(0)
  yearlyPrice    Decimal        @default(0)
  type           PlanType
  stripePlanId   String*/}
          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200"
              >
                <div className="p-6">
                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                    {plan.displayName}
                  </h2>
                  <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${currentPlanSelected === "Annual" ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>{" "}
                    <span className="text-base font-medium text-gray-500">
                      {currentPlanSelected === "Annual" ? "/yr" : "/mo"}
                    </span>
                  </p>
                  <a
                    href=""
                    className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                    data-plan={plan.id}
                    onClick={handleClick}
                  >
                    Buy {plan.displayName}
                  </a>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
                    What&apos;s included
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {getFeatures(plan.type).map((feature) => (
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
