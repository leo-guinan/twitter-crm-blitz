import React, { ReactNode, Suspense } from "react"
import { Head } from "blitz"
import Header from "../components/Header"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "Feather CRM"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback={<div>Loading...</div>}>
        {/*<div className="bg-gray-50 -z-10">*/}
        {/*  <div className="relative overflow-hidden">*/}
        {/*    <div className="absolute inset-y-0 h-full w-full" aria-hidden="true">*/}
        {/*      <div className="relative h-full">*/}
        {/*        <svg*/}
        {/*          className="absolute right-full transform translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full"*/}
        {/*          width={404}*/}
        {/*          height={784}*/}
        {/*          fill="none"*/}
        {/*          viewBox="0 0 404 784"*/}
        {/*        >*/}
        {/*          <defs>*/}
        {/*            <pattern*/}
        {/*              id="e229dbec-10e9-49ee-8ec3-0286ca089edf"*/}
        {/*              x={0}*/}
        {/*              y={0}*/}
        {/*              width={20}*/}
        {/*              height={20}*/}
        {/*              patternUnits="userSpaceOnUse"*/}
        {/*            >*/}
        {/*              <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />*/}
        {/*            </pattern>*/}
        {/*          </defs>*/}
        {/*          <rect width={404} height={784} fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)" />*/}
        {/*        </svg>*/}
        {/*        <svg*/}
        {/*          className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"*/}
        {/*          width={404}*/}
        {/*          height={784}*/}
        {/*          fill="none"*/}
        {/*          viewBox="0 0 404 784"*/}
        {/*        >*/}
        {/*          <defs>*/}
        {/*            <pattern*/}
        {/*              id="d2a68204-c383-44b1-b99f-42ccff4e5365"*/}
        {/*              x={0}*/}
        {/*              y={0}*/}
        {/*              width={20}*/}
        {/*              height={20}*/}
        {/*              patternUnits="userSpaceOnUse"*/}
        {/*            >*/}
        {/*              <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />*/}
        {/*            </pattern>*/}
        {/*          </defs>*/}
        {/*          <rect width={404} height={784} fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)" />*/}
        {/*        </svg>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        <Header />
        {children}
        {/*</div>*/}
        {/*</div>*/}
      </Suspense>
    </>
  )
}

export default Layout
