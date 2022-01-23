import { ITwitterUser } from "../../../types"

interface TwitterUserProfileProps {
  twitterUser: ITwitterUser
}

const TwitterUserProfile = ({ twitterUser }: TwitterUserProfileProps) => {
  return (
    <>
      <h1>Twitter User Profile</h1>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {twitterUser.twitterProfilePictureUrl && (
            <img
              className="h-8 w-8 rounded-full"
              src={twitterUser.twitterProfilePictureUrl}
              alt=""
            />
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{twitterUser.twitterName}</p>
          <p className="text-sm text-gray-500 truncate">{"@" + twitterUser.twitterUsername}</p>
        </div>

        <div className="flex-2">
          <p className="text-sm font-medium text-gray-900">{twitterUser.twitterBio}</p>
        </div>
      </div>
    </>
  )
}

export default TwitterUserProfile
