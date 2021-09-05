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

  const migrateUserToAWS = async () => {
    await window.fetch("/api/admin/migrate-user", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
      body: JSON.stringify({
        userId: 1,
      }),
    })
  }

  const migrateUserToOrg = async () => {
    await window.fetch("/api/admin/migrate-twitter-account", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
      body: JSON.stringify({
        userId: 13,
      }),
    })
  }

  const addTrialToUser = async () => {
    await db.trial.create({
      data: {
        userId: userToAddTrial,
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
        <div>
          <select name="userToAddTrialTo">
            {users.map((user) => (
              <option value={user.id} key={"user_" + user.id} onChange={handleSelectUser}>
                {user.id}
              </option>
            ))}
          </select>
          <Button
            label="Add Trial To User"
            onClick={addTrialToUser}
            color="blue"
            className="my-4"
          />
        </div>
        <div>
          <select name="userToMigrate">
            {users.map((user) => (
              <option
                value={user.id}
                key={"migrate_user_" + user.id}
                onChange={handleSelectMigrateUser}
              >
                {user.id}
              </option>
            ))}
          </select>
          <Button
            label="Migrate User to AWS"
            onClick={migrateUserToAWS}
            color="blue"
            className="my-4"
          />
        </div>
        <div>
          <select name="userToMigrateToOrg">
            {users.map((user) => (
              <option
                value={user.id}
                key={"migrate_user_org_" + user.id}
                onChange={handleSelectMigrateUserOrg}
              >
                {user.id}
              </option>
            ))}
          </select>
          <Button
            label="Migrate User to Org"
            onClick={migrateUserToOrg}
            color="blue"
            className="my-4"
          />
        </div>
      </section>
    </>
  )
}

export default AdminDashboard
