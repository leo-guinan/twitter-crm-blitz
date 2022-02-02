import React, { useState } from "react"
import Button from "./Button"
import { getAntiCSRFToken } from "blitz"
import LookupTwitterAccount from "../../twitter-accounts/components/LookupTwitterAccount"

const AdminDashboard = () => {
  const antiCSRFToken = getAntiCSRFToken()
  const [twitterUserToLookup, setTwitterUserToLookup] = useState({
    id: "",
    twitterId: "",
    twitterUsername: "",
    twitterName: "",
    twitterBio: "",
    twitterProfilePictureUrl: "",
  })
  const [triggeredEngagement, setTriggeredEngagement] = useState(false)
  // const [tweetCollections] = useQuery()
  // const {}
  const [engagementCollection, setEngagementCollection] = useState(0)

  const getEngagementFeed = async () => {
    setTriggeredEngagement(true)
    await window
      .fetch("/api/twitter/process-user", {
        method: "POST",
        credentials: "include",
        headers: {
          "anti-csrf": antiCSRFToken,
        },
        body: JSON.stringify({
          twitterAccountId: twitterUserToLookup.id,
        }),
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const populateFeed = async () => {
    setTriggeredEngagement(true)
    await window
      .fetch("/api/twitter/refresh-user", {
        method: "POST",
        credentials: "include",
        headers: {
          "anti-csrf": antiCSRFToken,
        },
        body: JSON.stringify({
          twitterAccountId: twitterUserToLookup.id,
        }),
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const runEngagement = async () => {
    setTriggeredEngagement(true)
    await window
      .fetch("/api/twitter/engagement-lookup", {
        method: "POST",
        credentials: "include",
        headers: {
          "anti-csrf": antiCSRFToken,
        },
        body: JSON.stringify({
          twitterId: twitterUserToLookup.twitterId,
        }),
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <section>
        <section id="lookupUser">
          <LookupTwitterAccount setTwitterAccount={setTwitterUserToLookup} />
        </section>
        <section id="engaged-feed">
          {twitterUserToLookup.twitterId && (
            <>
              <Button label="Refresh User" onClick={populateFeed} />
              <Button label="Trigger Engagement" onClick={runEngagement} />

              <Button label="Get Engagement Feed" onClick={getEngagementFeed} />
            </>
          )}
        </section>
        <section id="engagement-leaders"></section>
      </section>
    </>
  )
}

export default AdminDashboard
