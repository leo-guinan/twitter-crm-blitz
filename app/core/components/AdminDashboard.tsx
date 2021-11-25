import React, { useEffect, useState } from "react"
import Button from "./Button"
import { getAntiCSRFToken, useQuery } from "blitz"
import getAllUsers from "app/users/queries/getAllUsers"
import db from "db"
import getWaitlistedUsers from "../../users/queries/getWaitlistedUsers"

const AdminDashboard = () => {
  const antiCSRFToken = getAntiCSRFToken()
  const [userToAddTrial, setUserToAddTrial] = useState(0)
  const [users] = useQuery(getAllUsers, {})
  const [userToMigrate, setUserToMigrate] = useState(0)
  const [userToMigrateOrg, setUserToMigrateOrg] = useState(0)
  const [selectedWaitlistUser, setSelectedWaitlistUser] = useState("")
  const [selectedUserToFetch, setSelectedUserToFetch] = useState("")
  const [waitlisted] = useQuery(getWaitlistedUsers, {})
  const handleRefreshRelationships = async () => {
    await window.fetch("/api/twitter/populate", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
    })
  }

  const handleProcessMutuals = async () => {
    await window.fetch("/api/twitter/populate", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
    })
  }

  const handlePopulateUser = async () => {
    await window.fetch("/api/twitter/populate", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
      // body: {
      //   twitterAccountId: selectedWaitlistUser
      // }
    })
  }

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

  const handleSelectUser = (event) => {
    setUserToAddTrial(event.target.value)
  }

  const handleSelectMigrateUser = (event) => {
    setUserToMigrate(event.target.value)
  }

  const handleSelectMigrateUserOrg = (event) => {
    setUserToMigrateOrg(event.target.value)
  }

  const handleSelectWaitlistUser = (event) => {
    setSelectedWaitlistUser(event.target.value)
  }

  const handlePopulateWaitlistUser = () => {
    handlePopulateUser()
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

  return (
    <>
      <section>
        <Button
          label="Refresh Relationships"
          onClick={handleRefreshRelationships}
          color="blue"
          className="my-4"
        />
        <Button
          label="Process Mutuals"
          onClick={handleProcessMutuals}
          color="blue"
          className="my-4"
        />
        <section className="manage-waitlist">
          <select name="waitlist-members">
            {waitlisted.map((user) => (
              <option
                key={user.twitterAccount.twitterUsername}
                value={user.twitterAccount.id}
                onChange={handleSelectWaitlistUser}
              >
                {user.twitterAccount.twitterUsername}
              </option>
            ))}
          </select>
          <Button onClick={handlePopulateWaitlistUser} label="populate" color="blue" />
        </section>
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
      </section>
    </>
  )
}

export default AdminDashboard
