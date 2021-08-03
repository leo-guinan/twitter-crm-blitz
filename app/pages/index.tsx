import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { getAntiCSRFToken } from "blitz"
import Button from "app/core/components/Button"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  const handlePopulateFollowers = async () => {
    const antiCSRFToken = getAntiCSRFToken()
    const response = await window.fetch("/api/twitter/followers", {
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
    })
    console.log(response)
  }
  const handlePopulateDirectMessages = async () => {
    const antiCSRFToken = getAntiCSRFToken()
    const response = await window.fetch("/api/twitter/direct-messages", {
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
    })
    console.log(response)
  }

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
          <br />
          {!currentUser.twitterUsername && <a href="/api/auth/twitter">Log In With Twitter</a>}
          {currentUser.twitterUsername && (
            <section>
              User Twitter Info: <span>{currentUser.twitterUsername}</span>
              <div>
                <a className="button small">
                  <strong>Followers</strong>
                </a>
              </div>
              <div>
                <a className="button small">
                  <strong>Direct Messages</strong>
                </a>
              </div>
              <div>
                <Button onClick={handlePopulateFollowers} color="blue" label="Populate Followers" />
              </div>
              <div>
                <Button
                  onClick={handlePopulateDirectMessages}
                  color="blue"
                  label="Populate Direct Messages"
                />
              </div>
            </section>
          )}
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <div></div>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div>
      <h1>Twitter CRM</h1>

      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
