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
      <div className="w-96 mx-auto px-4 py-4 bg-white shadow-md rounded-lg" key={tweet.tweetId}>
        <div className="py-2 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <a
              href="#"
              className="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg"
            >
              {tweet.authorAccount && tweet.authorAccount.twitterProfilePictureUrl && (
                <img
                  className="rounded-full h-8 w-8 object-cover"
                  src={tweet.authorAccount ? tweet.authorAccount.twitterProfilePictureUrl : ""}
                  alt=""
                />
              )}

              <p className="ml-2 text-base font-medium">
                {tweet.authorAccount ? tweet.authorAccount.twitterName : ""}
              </p>
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
