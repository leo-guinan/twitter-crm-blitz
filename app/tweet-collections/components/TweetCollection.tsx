import Tweet from "./Tweet"

interface AuthorItem {
  name: string
  profilePictureUrl: string
  username: string
}

interface TweetItem {
  tweetId: string
  message: string
  tweetCreatedAt: any
  author: AuthorItem
}

interface TweetCollectionProps {
  tweets: TweetItem[]
}

const TweetCollection = (props: TweetCollectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 my-6 px-4 md:px-6 lg:px-8">
      {props.tweets &&
        props.tweets
          .sort((firstEl, secondEl) => firstEl.tweetCreatedAt - secondEl.tweetCreatedAt)
          .map((tweet) => <Tweet tweet={tweet} key={tweet.tweetId} />)}
    </div>
  )
}

export default TweetCollection
