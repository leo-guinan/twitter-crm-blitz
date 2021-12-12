interface AuthorItem {
  name: string
  username: string
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

const Tweet = ({ tweet }: TweetProps) => {
  return (
    <a
      href={`https://twitter.com/${tweet.author.username}/status/${tweet.tweetId}`}
      target="_blank"
      rel="noreferrer"
    >
      <div className="w-96 mx-auto px-4 py-4 bg-white shadow-md rounded-lg" key={tweet.tweetId}>
        <div className="py-2 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <a
              href="#"
              className="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg"
            >
              <img
                className="rounded-full h-8 w-8 object-cover"
                src={tweet.author.profilePictureUrl}
                alt=""
              />
              <p className="ml-2 text-base font-medium">{tweet.author.name}</p>
            </a>
          </div>
          <div className="flex flex-row items-center">
            <p className="text-xs font-semibold text-gray-500">
              {tweet.tweetCreatedAt.toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="mt-2"></div>
        <div className="py-2">
          <p className="leading-snug">{tweet.message}</p>
        </div>
      </div>
    </a>
  )
}

export default Tweet
