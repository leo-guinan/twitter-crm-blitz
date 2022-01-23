import {
  BlitzPage,
  getAntiCSRFToken,
  GetServerSideProps,
  InferGetServerSidePropsType,
  useParam,
  useQuery,
  useRouter,
} from "blitz"
import React, { Suspense, useState } from "react"
import Layout from "app/core/layouts/Layout"
import db from "db"

const VerifySubscriptionPage: BlitzPage = ({
  successfullyVerified,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {successfullyVerified && <div>Successfully verified!</div>}
        {!successfullyVerified && (
          <div>Unable to verify your code. Please double check your link and try again.</div>
        )}
      </Suspense>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let verified = false

  const code = context?.params?.code
  const verification = await db.offSiteSubscribersToVerify.findFirst({
    where: {
      verificationString: code as string,
    },
    include: {
      offSiteSubscriber: true,
    },
  })

  if (verification) {
    await db.offSiteSubscriber.update({
      where: {
        id: verification.offSiteSubscriber.id,
      },
      data: {
        verified: true,
      },
    })
    await db.offSiteSubscribersToVerify.delete({
      where: {
        id: verification.id,
      },
    })
    verified = true
  }

  return { props: { successfullyVerified: verified } }
}

VerifySubscriptionPage.authenticate = false
VerifySubscriptionPage.getLayout = (page) => <Layout>{page}</Layout>

export default VerifySubscriptionPage
