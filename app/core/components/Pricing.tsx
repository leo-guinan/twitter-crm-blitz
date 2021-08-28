import PricingOption from "./PricingOption"
import createCheckoutSession from "app/users/mutations/createCheckoutSession"
import customerPortal from "app/users/mutations/customerPortal"
import { loadStripe } from "@stripe/stripe-js"
import { useMutation, useRouter, Routes } from "blitz"

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
  const prices = {
    basic: process.env.STRIPE_PRICE_ID_BASIC,
    premium: process.env.STRIPE_PRICE_ID_PREMIUM,
    pro: process.env.STRIPE_PRICE_ID_PRO,
  }

  return (
    <section className="flex-col flex flex-auto space-y-8 lg:space-x-8 my-20 lg:flex-row ">
      <PricingOption
        optionName="Basic"
        optionFeatures={["100 DMs for free", "Pay per DM"]}
        optionPrice="$0.01"
        optionUnit="DM sent"
      />
      <PricingOption
        optionName="Premium"
        optionFeatures={["1250 DMs included", "billed at $0.01/DM after"]}
        optionPrice="$10"
        optionUnit="Month"
      />
      <PricingOption
        optionName="Pro"
        optionFeatures={["Send Unlimited DMs", "DM Search functionality (coming soon)"]}
        optionPrice="$25"
        optionUnit="Month"
      />
      <PricingOption
        optionName="Enterprise"
        optionFeatures={[
          "All the features of Pro",
          "Support for Multiple Users",
          "Contact Us for Pricing",
          "Coming Soon",
        ]}
        optionPrice=""
        optionUnit=""
      />
    </section>
  )
}

export default Pricing
