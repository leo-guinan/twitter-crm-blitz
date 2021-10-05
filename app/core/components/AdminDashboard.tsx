import React, { useState } from "react"
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
      </section>
    </>
  )
}

export default AdminDashboard
