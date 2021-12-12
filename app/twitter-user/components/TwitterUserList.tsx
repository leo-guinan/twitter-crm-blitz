import TwitterUser from "./TwitterUser"

interface ITwitterUser {
  twitterId: string
  username: string
  name: string
  bio: string
  profilePictureUrl: string
}

interface ITwitterUserListProps {
  twitterUsers: ITwitterUser[]
  actionCTA: string
  actionHandler: (twitterId) => void
  actionPerformed: boolean
}

const TwitterUserList = ({
  twitterUsers,
  actionCTA,
  actionHandler,
  actionPerformed,
}: ITwitterUserListProps) => {
  return (
    <>
      <div>
        <div className="flow-root mt-6">
          <ul role="list" className="-my-5 divide-y divide-gray-200 border-gray-300">
            {twitterUsers.map((twitterUser, i) => (
              <li key={i} className="p-4">
                <TwitterUser
                  twitterUser={twitterUser}
                  actionCTA={actionCTA}
                  actionHandler={actionHandler}
                  actionPerformed={actionPerformed}
                  key={twitterUser.twitterId}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default TwitterUserList
