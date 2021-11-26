import PricingOption from "./PricingOption"
import createCheckoutSession from "app/users/mutations/createCheckoutSession"
import customerPortal from "app/users/mutations/customerPortal"
import { loadStripe } from "@stripe/stripe-js"
import { useMutation, useRouter, Routes } from "blitz"

const Subscribe = () => {
  const [createCheckoutSessionMutation] = useMutation(createCheckoutSession)
  const [customerPortalMutation] = useMutation(customerPortal)
  const prices = {
    basic: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC,
    premium: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM,
    premium_annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_ANNUAL,
    pro: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO,
    pro_annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_ANNUAL,
  }

  const handleClick = async (event) => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key missing")
    }
    if (!process.env.NEXT_PUBLIC_STRIPE_PRICE_ID) {
      throw new Error("Stripe publishable key missing")
    }
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    console.log("plan: " + prices[event.target.dataset.plan])
    let lineItem = {
      priceId: prices[event.target.dataset.plan],
      quantity: 0,
    }
    if (event.target.dataset.plan === "pro") {
      lineItem.quantity = 1
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
      <section className="flex flex-auto gap-8 my-20 flex-wrap	justify-center">
        <PricingOption
          optionName="Free"
          optionFeatures={["1 Subscription"]}
          optionPrice="Free"
          optionUnit=""
          optionLink={{
            label: "Subscribe to Basic",
            data: "basic",
            onClick: (event) => handleClick(event),
          }}
        />
        <PricingOption
          optionName="Premium"
          optionFeatures={["1250 DMs included", "billed at $0.01/DM after"]}
          optionPrice="$10"
          optionUnit="Month"
          optionLink={{
            label: "Subscribe to Premium",
            data: "premium",
            onClick: (event) => handleClick(event),
          }}
        />
        <PricingOption
          optionName="Premium"
          optionFeatures={[
            "Annual Subscription",
            "Save 17%",
            "Billed at $100/year",
            "Includes unlimited DMs",
          ]}
          optionPrice="$8.33"
          optionUnit="Month"
          optionLink={{
            label: "Subscribe to Premium",
            data: "premium_annual",
            onClick: (event) => handleClick(event),
          }}
        />
      </section>
      <section className="flex flex-auto gap-8 my-20 flex-wrap	justify-center">
        <PricingOption
          optionName="Pro"
          optionFeatures={["Send Unlimited DMs", "DM Search functionality (coming soon)"]}
          optionPrice="$25"
          optionUnit="Month"
          optionLink={{
            label: "Subscribe to Pro",
            data: "pro",
            onClick: (event) => handleClick(event),
          }}
        />

        <PricingOption
          optionName="Pro"
          optionFeatures={[
            "Annual Subscription",
            "Save 17%",
            "Billed at $250/year",
            "Send Unlimited DMs",
            "DM Search functionality (coming soon)",
          ]}
          optionPrice="$20.83"
          optionUnit="Month"
          optionLink={{
            label: "Subscribe to Pro (Annual)",
            data: "pro_annual",
            onClick: (event) => handleClick(event),
          }}
        />

        {/* <PricingOption
        optionName="Enterprise"
        optionFeatures={[
          "All the features of Pro",
          "Support for Multiple Users",
          "Contact Us for Pricing",
          "Coming Soon",
        ]}
        optionPrice=""
        optionUnit=""
      /> */}
      </section>
    </>
  )
}

export default Subscribe
