import { TwitterTweetEmbed } from "react-twitter-embed"

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
}

const Tweet = ({ tweet }: TweetProps) => {
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
      <TwitterTweetEmbed tweetId={tweet.tweetId} placeholder="Loading..." />
    </a>
  )
}

export default Tweet
