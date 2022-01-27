import Tweet from "./Tweet"

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
}

const TweetCollection = (props: TweetCollectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 mx-auto my-6 px-4 md:px-6 lg:px-8 md:w-1/2">
      {props.tweets &&
        props.tweets
          .sort((firstEl, secondEl) => firstEl.tweetCreatedAt - secondEl.tweetCreatedAt)
          .map((tweet) => <Tweet tweet={tweet} key={tweet.tweetId} />)}
    </div>
  )
}

export default TweetCollection
