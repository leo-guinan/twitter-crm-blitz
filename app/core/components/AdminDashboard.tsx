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

  const handleRefreshBrian = async () => {
    await window.fetch("/api/twitter/refresh-user", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
      body: JSON.stringify({
        twitterId: "293839862", //brian
        // twitterId: "1325102346792218629" // Leo
      }),
    })
  }
  7
  return (
    <>
      <section>
        <Button
          label="Refresh Relationships"
          onClick={handleRefreshRelationships}
          color="blue"
          className="my-4"
        />

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
          <Button onClick={handleRefreshBrian} label="Refresh Brian" color="green" />
        </section>
      </section>
    </>
  )
}

export default AdminDashboard
