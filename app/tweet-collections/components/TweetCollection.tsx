import Tweet from "./Tweet"
import Button from "../../core/components/Button"
import AmplifyTweetPage from "../../pages/tools/amplify/[tweetId]"
import { Routes, useRouter } from "blitz"

interface AuthorItem {
  twitterName: string | null
  twitterProfilePictureUrl: string | null
  twitterUsername: string | null
}

interface TweetItem {
  tweetId: string
  message: string
  tweetCreatedAt: any
  authorAccount: AuthorItem | null
}

interface TweetCollectionProps {
  tweets: TweetItem[]
  showAmplification?: boolean
}

const TweetCollection = (props: TweetCollectionProps) => {
  const router = useRouter()
  return (
    <div className="grid grid-cols-1 gap-6 mx-auto my-6 px-4 md:px-6 lg:px-8 md:w-1/2">
      {props.tweets &&
        props.tweets
          .sort((firstEl, secondEl) => secondEl.tweetCreatedAt - firstEl.tweetCreatedAt)
          .map((tweet) => (
            <div key={tweet.tweetId}>
              <Tweet tweet={tweet} showAmplification={props.showAmplification} />
            </div>
          ))}
    </div>
  )
}

export default TweetCollection
