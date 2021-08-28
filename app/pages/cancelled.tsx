import { Link, BlitzPage } from "blitz"
import Layout from "app/pages/feather/layouts/Layout"

const Cancelled: BlitzPage = () => {
  return (
    <div className="container">
      <main>
        <p>Your subscription has been cancelled.</p>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </main>
    </div>
  )
}

Cancelled.suppressFirstRenderFlicker = true
Cancelled.getLayout = (page) => <Layout title="Cancelled">{page}</Layout>

export default Cancelled
