import React, { useState } from "react"
import Button from "./Button"
import { getAntiCSRFToken, Link, Routes } from "blitz"
import LookupTwitterAccount from "../../twitter-accounts/components/LookupTwitterAccount"
import ShowTweetCollectionPage from "../../pages/tweet-collections/[tweetCollectionId]"

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
  const [engagementCollection, setEngagementCollection] = useState({
    id: "",
  })

  const engagedUsers = []
  const [recentTweetCollection, setRecentTweetCollection] = useState({
    id: "",
  })

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
        setEngagementCollection(json)
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
          twitterAccountTwtterId: twitterUserToLookup.twitterId,
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
    console.log(JSON.stringify(twitterUserToLookup))
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

  const getLatestTweetsForAccount = async () => {
    await window
      .fetch("/api/twitter/get-latest-tweets-collection", {
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
        setRecentTweetCollection(json)
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
              <Button label="Get Recent Tweets" onClick={getLatestTweetsForAccount} />
            </>
          )}
        </section>
        <section id="engagement-leaders">
          {engagementCollection.id && (
            <>
              <Link
                href={Routes.ShowTweetCollectionPage({
                  tweetCollectionId: engagementCollection.id,
                })}
              >
                <a className="text-sm leading-5 text-gray-500">Engagement Collection</a>
              </Link>
            </>
          )}
        </section>
      </section>
      <section id="engaged-users">{engagedUsers && <></>}</section>
      <section id="recent-tweets">
        {recentTweetCollection.id && (
          <>
            <Link
              href={Routes.ShowTweetCollectionPage({ tweetCollectionId: recentTweetCollection.id })}
            >
              <a className="text-sm leading-5 text-gray-500">Recent Tweet Collection</a>
            </Link>
          </>
        )}
      </section>
    </>
  )
}

export default AdminDashboard
