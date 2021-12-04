interface ITwitterUser {
  twitterId: string
  username: string
  name: string
  bio: string
  profilePictureUrl: string
}

interface ITwitterUserProps {
  twitterUser: ITwitterUser
  actionCTA: string
  actionHandler: (event: any) => void
}

const TwitterUser = ({ twitterUser, actionCTA, actionHandler }: ITwitterUserProps) => {
  return (
    <>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img className="h-8 w-8 rounded-full" src={twitterUser.profilePictureUrl} alt="" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{twitterUser.name}</p>
          <p className="text-sm text-gray-500 truncate">{"@" + twitterUser.username}</p>
        </div>
        <div className="flex-2">
          <p className="text-sm font-medium text-gray-900">{twitterUser.bio}</p>
        </div>
        <div>
          <a
            href="#"
            className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
            data-twitter-id={twitterUser.twitterId}
            onClick={actionHandler}
          >
            {actionCTA}
          </a>
        </div>
      </div>
    </>
  )
}

export default TwitterUser
