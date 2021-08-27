import { useRouter, Routes } from "blitz"

interface PricingOptionProps {
  optionName: string
  optionFeatures: string[]
  optionPrice: string
  optionUnit: string
}

const PricingOption = (props: PricingOptionProps) => {
  const router = useRouter()

  const handleSignup = () => router.push(Routes.SignupPage())

  return (
    <div className="shadow-lg rounded-2xl w-64 bg-indigo-500 dark:bg-gray-800 p-4">
      <div className="flex text-white  items-center justify-between">
        <p className="text-3xl font-medium mb-4">{props.optionName}</p>
        <p className="text-2xl font-bold flex flex-col">
          {props.optionPrice} {props.optionPrice && "/"}
          <span className="font-thin text-right text-sm">{props.optionUnit}</span>
        </p>
      </div>
      <p className="text-white text-md mt-4">Plan include :</p>
      <ul className="text-sm text-white w-full mt-6 mb-6">
        {props.optionFeatures.map((feature, i) => (
          <li className="mb-3 flex items-center " key={i}>
            <svg
              className="h-6 w-6 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="6"
              stroke="currentColor"
              fill="white"
              viewBox="0 0 1792 1792"
            >
              <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="w-full px-3 py-3 text-sm shadow rounded-lg text-indigo-500 bg-white hover:bg-gray-100 "
        onClick={handleSignup}
      >
        Sign up for free
      </button>
    </div>
  )
}

export default PricingOption
