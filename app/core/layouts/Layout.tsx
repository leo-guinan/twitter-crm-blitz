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
        <title>{title || "twitter-crm-blitz"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <section className="container mx-auto px-20">{children}</section>
      </Suspense>
    </>
  )
}

export default Layout
