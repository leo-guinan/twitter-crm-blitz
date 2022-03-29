import { Tweet as TweetEmbed } from "react-static-tweets"
import Button from "../../core/components/Button"
import React from "react"

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
  const requestAmplification = () => {}
  return (
    <a
      href={
        tweet.authorAccount
          ? `https://twitter.com/${tweet.authorAccount.twitterUsername}/status/${tweet.tweetId}`
          : ""
      }
      target="_blank"
      rel="noreferrer"
    >
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
    </a>
  )
}

export default Tweet
