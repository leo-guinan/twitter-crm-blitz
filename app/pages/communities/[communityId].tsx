import React, { Suspense, useState } from "react"
import {
  BlitzPage,
  getAntiCSRFToken,
  Head,
  Link,
  Routes,
  useMutation,
  useParam,
  useQuery,
  useRouter,
} from "blitz"
import Layout from "app/pages/feather/layouts/Layout"
import getCommunity from "app/communities/queries/getCommunity"
import Button from "../../core/components/Button"
import TwitterUserList from "../../twitter-user/components/TwitterUserList"
import addUserToCommunity from "../../communities/mutations/addUserToCommunity"

export const Community = () => {
  const antiCSRFToken = getAntiCSRFToken()

  const router = useRouter()
  const communityId = useParam("communityId", "number")
  const [community] = useQuery(getCommunity, { id: communityId })
  const [twitterUserToLookup, setTwitterUserToLookup] = useState("")

  const [addMemberToCommunity] = useMutation(addUserToCommunity)

  const [twitterUserToSubscribeTo, setTwitterUserToAddToCommunity] = useState({
    twitterId: "",
    twitterUsername: "",
    twitterName: "",
    twitterBio: "",
    twitterProfilePictureUrl: "",
  })
  const handleRemoveMemberFromCommunity = () => {
    //do something to remove member from community
    console.log("Pretending to remove member")
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
        setTwitterUserToAddToCommunity({
          twitterId: json.twitterId,
          twitterUsername: json.twitterUsername,
          twitterName: json.twitterName,
          twitterBio: json.twitterBio,
          twitterProfilePictureUrl: json.twitterProfilePictureUrl,
        })
      )
  }

  const handleTwitterUserToLookupChange = (event) => {
    setTwitterUserToLookup(event.target.value)
  }

  const handleAddUserToCommunity = async (event) => {
    const membership = await addMemberToCommunity({
      communityId: community.id,
      twitterId: event.target.dataset.twitterId,
    })
  }

  return (
    <>
      <p className="m-4">
        <Link href={Routes.CommunitiesPage()}>
          <a className="text-sm leading-5 text-gray-500">Communities</a>
        </Link>
        <span className="text-sm leading-5 text-gray-500"> {">"} </span>
        {communityId && (
          <Link href={Routes.ShowCommunityPage({ communityId })}>
            <a className="text-sm leading-5 text-gray-500">{community.name}</a>
          </Link>
        )}
      </p>
      <Head>
        <title>{community.name}</title>
      </Head>
      <div className="border-2  m-4">
        <div className="flex flex-col w-full  p-6 mx-auto border-b-2">
          <h1 className="flex flex-row mx-auto ">{community.name}</h1>
          <div className="flex flex-row mx-auto">
            <p className="text-sm leading-5 text-gray-500">{community.description}</p>
          </div>
        </div>
        <div className="flex flex-col p-16 items-center">
          <h2>Community Members</h2>
          <TwitterUserList
            twitterUsers={community.communityMembers?.map(
              (communityMember) => communityMember.account
            )}
            actionCTA="Remove"
            actionHandler={handleRemoveMemberFromCommunity}
            actionPerformed={() => false}
            view="compact"
          />
        </div>
        <div className="flex flex-col">
          <section>
            <section>
              <div>
                <div className="border-2  m-4 w-full max-w-xs p-6 mx-auto">
                  <h2 className="mx-auto">Add a member to this community</h2>

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
                    Enter the Twitter username to lookup, without the &apos;@&apos; at the
                    beginning.
                  </p>
                </div>
              </div>
            </section>
            {twitterUserToSubscribeTo.twitterId && (
              <section className="border-2 mx-4 p-6">
                <TwitterUserList
                  twitterUsers={[twitterUserToSubscribeTo]}
                  actionHandler={handleAddUserToCommunity}
                  actionCTA="Add to Community"
                  actionPerformed={() => false}
                  view="standard"
                />
              </section>
            )}
            {!twitterUserToSubscribeTo.twitterId && twitterUserToSubscribeTo.twitterName && (
              <section className="border-2 mx-4 p-6">
                <TwitterUserList
                  twitterUsers={[twitterUserToSubscribeTo]}
                  actionHandler={handleAddUserToCommunity}
                  actionCTA="Please try a different user name."
                  actionPerformed={() => true}
                  view="standard"
                />
              </section>
            )}
          </section>
        </div>
      </div>
    </>
  )
}

const ShowCommunityPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Community />
      </Suspense>
    </div>
  )
}

ShowCommunityPage.authenticate = true
ShowCommunityPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCommunityPage
