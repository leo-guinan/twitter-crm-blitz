import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XIcon } from "@heroicons/react/outline"
import Pricing from "./Pricing"
import { loadStripe } from "@stripe/stripe-js"
import { useMutation } from "blitz"
import createCheckoutSession from "../../users/mutations/createCheckoutSession"

const UpgradePlan = () => {
  return <Pricing />
}

export default UpgradePlan
