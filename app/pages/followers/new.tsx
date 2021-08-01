import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createFollower from "app/followers/mutations/createFollower"
import { FollowerForm, FORM_ERROR } from "app/followers/components/FollowerForm"

const NewFollowerPage: BlitzPage = () => {
  const router = useRouter()
  const [createFollowerMutation] = useMutation(createFollower)

  return (
    <div>
      <h1>Create New Follower</h1>

      <FollowerForm
        submitText="Create Follower"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateFollower}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const follower = await createFollowerMutation(values)
            router.push(Routes.ShowFollowerPage({ followerId: follower.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.FollowersPage()}>
          <a>Followers</a>
        </Link>
      </p>
    </div>
  )
}

NewFollowerPage.authenticate = true
NewFollowerPage.getLayout = (page) => <Layout title={"Create New Follower"}>{page}</Layout>

export default NewFollowerPage
