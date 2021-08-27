import React, { useState } from "react"
import Button from "./Button"
import { getAntiCSRFToken, useQuery } from "blitz"
import getAllUsers from "app/users/queries/getAllUsers"
import db from "db"

const AdminDashboard = () => {
  const antiCSRFToken = getAntiCSRFToken()
  const [userToAddTrial, setUserToAddTrial] = useState(0)
  const [users] = useQuery(getAllUsers, {})

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
      </section>
    </>
  )
}

export default AdminDashboard
