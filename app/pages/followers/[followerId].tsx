import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getFollower from "app/followers/queries/getFollower"
import deleteFollower from "app/followers/mutations/deleteFollower"

export const Follower = () => {
  const router = useRouter()
  const followerId = useParam("followerId", "number")
  const [deleteFollowerMutation] = useMutation(deleteFollower)
  const [follower] = useQuery(getFollower, { id: followerId })

  return (
    <>
      <Head>
        <title>Follower {follower.id}</title>
      </Head>

      <div>
        <h1>Follower {follower.id}</h1>
        <pre>{JSON.stringify(follower, null, 2)}</pre>

        <Link href={Routes.EditFollowerPage({ followerId: follower.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteFollowerMutation({ id: follower.id })
              router.push(Routes.FollowersPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowFollowerPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.FollowersPage()}>
          <a>Followers</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Follower />
      </Suspense>
    </div>
  )
}

ShowFollowerPage.authenticate = true
ShowFollowerPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowFollowerPage
