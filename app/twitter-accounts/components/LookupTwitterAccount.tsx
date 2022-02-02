import Button from "../../core/components/Button"
import React, { useState } from "react"
import { getAntiCSRFToken } from "blitz"

const LookupTwitterAccount = ({ setTwitterAccount }) => {
  const antiCSRFToken = getAntiCSRFToken()

  const [twitterUserToLookup, setTwitterUserToLookup] = useState("")

  const handleTwitterUserToLookupChange = (event) => {
    setTwitterUserToLookup(event.target.value)
  }

  const handleLookupUser = async () => {
    const response = await window
      .fetch("/api/twitter/lookup-user", {
        method: "POST",
        credentials: "include",
        headers: {
          "anti-csrf": antiCSRFToken,
        },
        body: JSON.stringify({
          twitterUsername: twitterUserToLookup,
        }),
      })
      .then((response) => response.json())
      .then((json) =>
        setTwitterAccount({
          id: json.id,
          twitterId: json.twitterId,
          twitterUsername: json.twitterUsername,
          twitterName: json.twitterName,
          twitterBio: json.twitterBio,
          twitterProfilePictureUrl: json.twitterProfilePictureUrl,
        })
      )
  }

  return (
    <div>
      <div className="border-2  m-4 w-full max-w-xs p-6 mx-auto">
        <input
          type="url"
          onChange={handleTwitterUserToLookupChange}
          value={twitterUserToLookup}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full block sm:text-sm border-gray-300 rounded-md"
          placeholder="feathercrm"
        />
        <Button
          onClick={handleLookupUser}
          label="Lookup Twitter User"
          color="red"
          className="grid-cols-1"
        />
        <p className="mt-2 text-sm text-gray-500" id="email-description">
          Enter the Twitter username to lookup, without the &apos;@&apos; at the beginning.
        </p>
      </div>
    </div>
  )
}

export default LookupTwitterAccount
