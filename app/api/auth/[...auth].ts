// app/api/auth/[...auth].ts
import { passportAuth } from "blitz"
import TwitterStrategy from "passport-twitter"
import db from "db"
import twitterFollowing from "app/api/queues/twitter-following"
import twitterFollowers from "app/api/queues/twitter-followers"
import Amplify, { API, graphqlOperation } from "aws-amplify"
import { createTwitterAccount } from "src/graphql/mutations"

export default passportAuth(({ ctx, req, res }) => ({
  successRedirectUrl: "/feather",
  errorRedirectUrl: "/",
  secureProxy: true,
  strategies: [
    {
      strategy: new TwitterStrategy(
        {
          consumerKey: process.env.TWITTER_CONSUMER_KEY as string,
          consumerSecret: process.env.TWITTER_CONSUMER_SECRET as string,
          callbackURL: process.env.TWITTER_CALLBACK_URL,

          /*...*/
        },
        async function (token, tokenSecret, profile, done) {
          console.log("Successfully retrieved data for user. User id: " + ctx.session.userId)
          const user = await db.user.update({
            where: { id: ctx.session.userId as number },

            data: {
              name: profile.displayName,
              twitterToken: token,
              twitterSecretToken: tokenSecret,
              twitterUsername: profile.username,
              twitterId: profile.id,
            },
          })

          const twitterAccount = {
            userId: ctx.session.userId,
            twitterToken: token,
            twitterSecretToken: tokenSecret,
            twitterUser: {
              twitterId: profile.id,
            },
          }
          await API.graphql(graphqlOperation(createTwitterAccount, { input: twitterAccount }))

          await twitterFollowing.enqueue({ userId: user.id })
          await twitterFollowers.enqueue({ userId: user.id })

          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: "twitter",
          }
          done(undefined, { publicData })
        }
      ),
    },
  ],
}))
