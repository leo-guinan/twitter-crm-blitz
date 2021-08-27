import CTA from "./CTA"
import Features from "./Features"
import Header from "./Header"
import Pricing from "./Pricing"

const LandingPage = () => {
  return (
    <>
      <section className="flex flex-col	 items-center justify-center">
        <div className="flex items-center justify-center  border-t-2">
          <CTA />
        </div>
        <div className="flex items-center justify-center  border-t-2">
          <Features />
        </div>
        <div className="flex items-center justify-center  border-t-2">
          <a href="#pricing">
            <Pricing />
          </a>
        </div>
      </section>
    </>
  )
}

export default LandingPage
