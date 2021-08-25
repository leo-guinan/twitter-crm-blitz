import React, { ReactNode, Suspense } from "react"
import { Head } from "blitz"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "twitter-crm-blitz"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback={<div>Loading...</div>}>
        <main className="bg-gray-100 dark:bg-gray-800 rounded-2xl relative">
          <div className="flex items-start justify-between">
            <div className="h-screen hidden lg:block my-4 ml-4 shadow-lg relative w-80">
              <div className="bg-white h-full rounded-2xl dark:bg-gray-700">
                <div className="flex items-center justify-center pt-6">
                  <img src="/logo.png" />
                </div>
                <Sidebar />
              </div>
            </div>
            <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
              <section>{children}</section>
            </div>
          </div>
        </main>
      </Suspense>
    </>
  )
}

export default Layout
