// app/api/auth/[...auth].ts
import { passportAuth } from "blitz"
import TwitterStrategy from "passport-twitter"
import db, { MembershipRole } from "db"
import twitterFollowing from "app/api/queues/twitter-following"
import twitterFollowers from "app/api/queues/twitter-followers"

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

          const user = await db.user.create({
            data: {
              role: "CUSTOMER",
              memberships: {
                create: {
                  role: "OWNER",
                  organization: {
                    create: {
                      name: "",
                    },
                  },
                },
              },
            },
            select: {
              id: true,
              name: true,
              role: true,
              subscriptionStatus: true,
              memberships: {
                select: {
                  organizationId: true,
                  role: true,
                  organization: {
                    select: {
                      subscriptionStatus: true,
                    },
                  },
                },
              },
            },
          })
          const twitterAccount = await db.twitterAccount.create({
            data: {
              twitterToken: token,
              twitterSecretToken: tokenSecret,
              twitterUsername: profile.username,
              twitterId: profile.id,
              organizationId: ctx.session.orgId,
            },
          })
          await ctx.session.$create({
            userId: user.id,
            roles: [user?.role, user?.memberships[0]?.role || MembershipRole.USER],
            orgId: user?.memberships[0]?.organizationId,
            subscriptionStatus: user?.memberships[0]?.organization?.subscriptionStatus || "incomplete",
          })
          return user
          if (ctx.session.orgId) {

            const user = await db.user.update({
              where: { id: ctx.session.userId as number },

              data: {
                name: profile.displayName,
              },
            })

            await twitterFollowing.enqueue({ userId: user.id })
            await twitterFollowers.enqueue({ userId: user.id })
          }
          const publicData = {
            userId: ctx.session.userId,
            roles: ctx.session.roles,
            source: "twitter",
          }
          done(undefined, { publicData })
        }
      ),
    },
  ],
}))
