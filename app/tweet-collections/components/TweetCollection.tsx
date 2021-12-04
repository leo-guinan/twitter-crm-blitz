import Tweet from "./Tweet"

interface AuthorItem {
  name: string
  profilePictureUrl: string
}

interface TweetItem {
  id: number
  message: string
  tweetCreatedAt: Date
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
          .map((tweet) => <Tweet tweet={tweet} key={tweet.id} />)}
    </div>
  )
}

export default TweetCollection
