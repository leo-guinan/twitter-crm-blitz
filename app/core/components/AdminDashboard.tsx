import React, { useState } from "react"
import Button from "./Button"
import { getAntiCSRFToken, useQuery } from "blitz"
import getAllUsers from "app/users/queries/getAllUsers"
import db from "db"

const AdminDashboard = () => {
  const antiCSRFToken = getAntiCSRFToken()
  const [userToAddTrial, setUserToAddTrial] = useState(0)
  const [users] = useQuery(getAllUsers, {})
  const [userToMigrate, setUserToMigrate] = useState(0)
  const [userToMigrateOrg, setUserToMigrateOrg] = useState(0)
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

  const handleSelectUser = (event) => {
    setUserToAddTrial(event.target.value)
  }

  const handleSelectMigrateUser = (event) => {
    setUserToMigrate(event.target.value)
  }

  const handleSelectMigrateUserOrg = (event) => {
    setUserToMigrateOrg(event.target.value)
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
      </section>
    </>
  )
}

export default AdminDashboard
