import React from "react"
import Features from "./Features"
import Pricing from "./Pricing"
import { ProductHuntBadge } from "./ProductHuntBadge"

const LandingPage = () => {
  // @ts-ignore
  return (
    <>
      <div className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 mb-16">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Faster growth</span>
            <span className="block text-indigo-600">through stronger relationships</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-2xl lg:text-4xl md:max-w-3xl">
            Feather helps you build stronger relationships on Twitter. And gives your audience the
            tools to help you grow.
          </p>
          <div className="py-8">
            <ProductHuntBadge />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className={"relative pb-[56.25%] h-0"}>
          <iframe
            src="https://www.loom.com/embed/881ca7c254134e12b423c833b5377a0e"
            frameBorder="0"
            // @ts-ignore
            webkitallowfullscreen
            mozallowfullscreen
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
        <Pricing />
        <Features />
      </div>
    </>
  )
}

export default LandingPage
