import { Tweet as TweetEmbed } from "react-static-tweets"
import Button from "../../core/components/Button"
import React from "react"
import { Routes, useRouter } from "blitz"

interface AuthorItem {
  twitterName: string | null
  twitterUsername: string | null
  twitterProfilePictureUrl: string | null
}

interface TweetItem {
  tweetId: string
  message: string
  tweetCreatedAt: Date
  authorAccount: AuthorItem | null
}

interface TweetProps {
  tweet: TweetItem
  showAmplification?: boolean
}

const Tweet = ({ tweet, showAmplification = false }: TweetProps) => {
  const router = useRouter()
  const requestAmplification = () =>
    router.push(Routes.AmplifyTweetPage({ tweetId: tweet.tweetId }))
  return (
    <>
      <TweetEmbed id={tweet.tweetId} />
      {showAmplification && (
        <div className="w-full">
          <Button
            label="Request Amplification"
            className="w-48 mx-auto"
            onClick={requestAmplification}
          />
        </div>
      )}
    </>
  )
}

export default Tweet
