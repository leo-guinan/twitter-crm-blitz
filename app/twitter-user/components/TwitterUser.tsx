import { ITwitterUser } from "../../../types"

interface ITwitterUserProps {
  twitterUser: ITwitterUser
  actionCTA: string
  actionHandler: (event: any) => void
  actionPerformed: (twitterUserId) => boolean
  view: "compact" | "standard"
}

const TwitterUser = ({
  twitterUser,
  actionCTA,
  actionHandler,
  actionPerformed,
  view,
}: ITwitterUserProps) => {
  return (
    <>
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
        {view === "standard" && (
          <div className="flex-2">
            <p className="text-sm font-medium text-gray-900">{twitterUser.twitterBio}</p>
          </div>
        )}

        <div>
          {actionPerformed(twitterUser.twitterId) && <span>Done!</span>}
          {!actionPerformed(twitterUser.twitterId) && (
            <a
              href="#"
              className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
              data-twitter-id={twitterUser.twitterId}
              onClick={actionHandler}
            >
              {actionCTA}
            </a>
          )}
        </div>
      </div>
    </>
  )
}

export default TwitterUser
