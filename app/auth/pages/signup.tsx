import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <section className="flex flex-col	 items-center justify-center">
      <SignupForm onSuccess={() => router.push(Routes.UserHome())} />
    </section>
  )
}

SignupPage.redirectAuthenticatedTo = "/feather/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
