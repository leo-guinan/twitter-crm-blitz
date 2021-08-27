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
        <title>{title || "Feather CRM"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        {children}
      </Suspense>
    </>
  )
}

export default Layout
