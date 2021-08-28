import { Link, BlitzPage, Routes } from "blitz"
import Layout from "app/pages/feather/layouts/Layout"

const Success: BlitzPage = () => {
  return (
    <div className="container">
      <main>
        <p>Success!</p>
        <Link href={Routes.RelationshipPage()}>
          <a>Back to Relationships</a>
        </Link>
      </main>
    </div>
  )
}

Success.suppressFirstRenderFlicker = true
Success.getLayout = (page) => <Layout title="Success">{page}</Layout>

export default Success
