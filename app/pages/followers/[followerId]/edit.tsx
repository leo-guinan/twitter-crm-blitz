import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getFollower from "app/followers/queries/getFollower"
import updateFollower from "app/followers/mutations/updateFollower"
import { FollowerForm, FORM_ERROR } from "app/followers/components/FollowerForm"

export const EditFollower = () => {
  const router = useRouter()
  const followerId = useParam("followerId", "number")
  const [follower, { setQueryData }] = useQuery(
    getFollower,
    { id: followerId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateFollowerMutation] = useMutation(updateFollower)

  return (
    <>
      <Head>
        <title>Edit Follower {follower.id}</title>
      </Head>

      <div>
        <h1>Edit Follower {follower.id}</h1>
        <pre>{JSON.stringify(follower)}</pre>

        <FollowerForm
          submitText="Update Follower"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateFollower}
          initialValues={follower}
          onSubmit={async (values) => {
            try {
              const updated = await updateFollowerMutation({
                id: follower.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowFollowerPage({ followerId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditFollowerPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditFollower />
      </Suspense>

      <p>
        <Link href={Routes.FollowersPage()}>
          <a>Followers</a>
        </Link>
      </p>
    </div>
  )
}

EditFollowerPage.authenticate = true
EditFollowerPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditFollowerPage
