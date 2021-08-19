// app/api/auth/[...auth].ts
import { passportAuth } from "blitz"
import TwitterStrategy from "passport-twitter"
import db from "db"
import twitterFollowing from "app/api/queues/twitter-following"
import twitterFollowers from "app/api/queues/twitter-followers"

export default passportAuth({
  successRedirectUrl: "/",
  errorRedirectUrl: "/",
  strategies: [
    {
      strategy: new TwitterStrategy(
        {
          consumerKey: process.env.TWITTER_CONSUMER_KEY as string,
          consumerSecret: process.env.TWITTER_CONSUMER_SECRET as string,
          callbackURL: process.env.TWITTER_CALLBACK_URL,

          includeEmail: true,
          /*...*/
        },
        async function (token, tokenSecret, profile, done) {
          const email = profile.emails && profile.emails[0]?.value

          if (!email) {
            // This can happen if you haven't enabled email access in your twitter app permissions
            return done(new Error("Twitter OAuth response doesn't have email."))
          }
          const user = await db.user.upsert({
            where: { email },
            create: {
              email,
              name: profile.displayName,
              twitterToken: token,
              twitterSecretToken: tokenSecret,
              twitterUsername: profile.username,
              twitterId: profile.id,
            },
            update: {
              email,
              name: profile.displayName,
              twitterToken: token,
              twitterSecretToken: tokenSecret,
              twitterUsername: profile.username,
              twitterId: profile.id,
            },
          })

          await twitterFollowing.enqueue({ userId: user.id, paginationToken: "" })
          await twitterFollowers.enqueue({ userId: user.id, paginationToken: "" })

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
})
