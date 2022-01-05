import {
  AppProps,
  AuthenticationError,
  AuthorizationError,
  ErrorBoundary,
  ErrorComponent,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  useRouter,
} from "blitz"
import * as Fathom from "fathom-client"

import LoginForm from "app/auth/components/LoginForm"
import "@stripe/stripe-js"
import "app/core/styles/index.css"
import { useEffect } from "react"

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()
  useEffect(() => {
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID!, {
      includedDomains: ["feathercrm.io", "www.feathercrm.io"],
      url: "https://successful-gorgeous.feathercrm.io/script.js",
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    //record page view on route change
    router.events.on("routeChangeComplete", onRouteChangeComplete)

    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete)
    }
  }, [])

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={useQueryErrorResetBoundary().reset}
    >
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
