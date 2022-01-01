import { BlitzPage, Link, Routes, useMutation, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import createCommunity from "app/communities/mutations/createCommunity"
import CreateCommunity from "../../communities/components/CreateCommunity"
import React from "react"

const NewCommunityPage: BlitzPage = () => {
  const router = useRouter()
  const [createCommunityMutation] = useMutation(createCommunity)
  const handleAddCommunity = async (community: { name; description }) => {
    await createCommunityMutation(community)
  }
  return (
    <div>
      <h1>Create New Community</h1>

      <CreateCommunity addCommunity={handleAddCommunity} />

      <p>
        <Link href={Routes.CommunitiesPage()}>
          <a>Communities</a>
        </Link>
      </p>
    </div>
  )
}

NewCommunityPage.authenticate = true
NewCommunityPage.getLayout = (page) => <Layout title={"Create New Community"}>{page}</Layout>

export default NewCommunityPage
