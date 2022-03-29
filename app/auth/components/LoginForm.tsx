import { Image } from "blitz"
import React, { Fragment } from "react"
import signInWithTwitter from "../../../public/sign_in_with_twitter.png"

type LoginFormProps = {
  redirectUrl: string
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  return (
    <div>
      <Fragment>
        <a
          className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-2 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
          href={
            props.redirectUrl
              ? `/api/auth/twitter?redirectUrl=${props.redirectUrl}`
              : "/api/auth/twitter"
          }
        >
          <Image src={signInWithTwitter} />
        </a>
      </Fragment>
    </div>
  )
}

export default LoginForm
