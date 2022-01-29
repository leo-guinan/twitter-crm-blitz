import React, { useState } from "react"
import Button from "./Button"
import { getAntiCSRFToken } from "blitz"

const AdminDashboard = () => {
  const antiCSRFToken = getAntiCSRFToken()
  const [twitterAccountUrl, setTwitterAccountUrl] = useState("")
  const [selectedUserToFetch, setSelectedUserToFetch] = useState("")

  const handleLookupEngagement = async () => {
    await window.fetch("/api/twitter/engagement-lookup", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
      body: JSON.stringify({
        twitterAccountId: selectedUserToFetch,
      }),
    })
  }

  const handleSelectUserToFetch = (event) => {
    console.log(`selected User to fetch: ${selectedUserToFetch}`)
    setSelectedUserToFetch(event.target.value)
  }

  const handleTwitterAccountUrlChange = (event) => {
    setTwitterAccountUrl(event.target.value)
  }

  const handleSendEmail = async () => {
    await window.fetch("/api/email/send", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
    })
  }

  const handleFetchWeeklyDigest = async () => {
    await window.fetch("/api/twitter/weekly-digest", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
      body: JSON.stringify({
        twitterAccountId: "1325102346792218629",
      }),
    })
  }

  const handleSubscribeToUser = async () => {
    await window.fetch("/api/twitter/subscribe-to-user", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
      body: JSON.stringify({
        twitterAccountUrl,
      }),
    })
  }

  const handleRefreshUsers = async () => {
    await window.fetch("/api/admin/update-twitter-accounts", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
    })
  }

  const handleRunTweetCollection = async () => {
    const tweetCollectionToRun = 41
    await window.fetch("/api/admin/run-tweet-collection", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
      body: JSON.stringify({
        twitterAccountUrl,
      }),
    })
  }

  const handleRouteDMs = async () => {
    await window.fetch("/api/admin/check-for-user-dms", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
    })
  }

  return (
    <>
      <section>
        {/*<section className="engagement-lookup">*/}
        {/*  <select name="users"*/}
        {/*          onChange={handleSelectUserToFetch}*/}
        {/*  >*/}
        {/*    {users.map((user) => (*/}
        {/*      user.memberships[0].organization.twitterAccounts[0] && (*/}
        {/*        <option*/}
        {/*          key={user.memberships[0].organization.twitterAccounts[0].twitterId}*/}
        {/*          value={user.memberships[0].organization.twitterAccounts[0] ? user.memberships[0].organization.twitterAccounts[0].twitterId : ""}*/}

        {/*        >*/}
        {/*          {user.memberships[0].organization.twitterAccounts[0].twitterUsername}*/}
        {/*        </option>*/}
        {/*      )*/}

        {/*    ))}*/}
        {/*  </select>*/}
        {/*  <Button onClick={handleLookupEngagement} label="engagement" color="blue" />*/}
        {/*</section>*/}
        <section>
          <Button onClick={handleSendEmail} label="Send Email" color="red" />
        </section>
        <section>
          <Button
            onClick={handleFetchWeeklyDigest}
            label="Fetch Weekly Digest for User"
            color="red"
          />
        </section>
        <section>
          <input type="url" onChange={handleTwitterAccountUrlChange} value={twitterAccountUrl} />
          <Button
            onClick={handleSubscribeToUser}
            label="Fetch Weekly Digest for User"
            color="red"
          />
        </section>
        <section>
          <Button onClick={handleRefreshUsers} label="Refresh Accounts" color="red" />
        </section>

        <section>
          <Button onClick={handleRunTweetCollection} label="Run Tweet Collection" color="red" />
        </section>

        <section>
          <Button onClick={handleRouteDMs} label="Route DMs" color="blue" />
        </section>
      </section>
    </>
  )
}

export default AdminDashboard
