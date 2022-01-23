import Pricing from "./Pricing"
import TwitterUserProfile from "../../twitter-user/components/TwitterUserProfile"

const UserProfile = () => {
  const twitterUser = {
    twitterId: "",
    twitterUsername: "",
    twitterName: "",
    twitterBio: "",
    twitterProfilePictureUrl: "",
  }

  return (
    <>
      <h1>This is the user profile.</h1>
      <section>
        <section>
          <section>
            <TwitterUserProfile twitterUser={twitterUser} />
          </section>
          {/*  for each custom field, create a new section that contains a list*/}
        </section>
        <section></section>
      </section>
    </>
  )
}

export default UserProfile
