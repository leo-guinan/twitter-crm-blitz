interface AuthorItem {
  name: string
  profilePictureUrl: string
}

interface TweetItem {
  tweetId: string
  message: string
  tweetCreatedAt: Date
  author: AuthorItem
}

interface TweetProps {
  tweet: TweetItem
}

const Tweet = (props: TweetProps) => {
  return (
    <div className="w-96 mx-auto px-4 py-4 bg-white shadow-md rounded-lg" key={props.tweet.tweetId}>
      <div className="py-2 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <a
            href="#"
            className="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg"
          >
            <img
              className="rounded-full h-8 w-8 object-cover"
              src={props.tweet.author.profilePictureUrl}
              alt=""
            />
            <p className="ml-2 text-base font-medium">{props.tweet.author.name}</p>
          </a>
        </div>
        <div className="flex flex-row items-center">
          <p className="text-xs font-semibold text-gray-500">
            {props.tweet.tweetCreatedAt.toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="mt-2"></div>
      <div className="py-2">
        <p className="leading-snug">{props.tweet.message}</p>
      </div>
    </div>
  )
}

export default Tweet
