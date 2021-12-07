// app/api/auth/[...auth].ts
import { passportAuth } from "blitz"
import TwitterStrategy from "passport-twitter"
import db, { MembershipRole } from "db"

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
          const lookedupUser = await db.twitterAccount.findFirst({
            where: {
              twitterId: profile.id,
            },
            select: {
              organizationId: true,
              organization: {
                select: {
                  id: true,
                  subscriptionStatus: true,
                  memberships: {
                    select: {
                      role: true,
                      user: true,
                    },
                  },
                },
              },
            },
          })
          if (!lookedupUser) {
            const user = await db.user.create({
              data: {
                role: "CUSTOMER",
                memberships: {
                  create: {
                    role: "OWNER",
                    organization: {
                      create: {
                        name: "",
                        twitterAccounts: {
                          create: {
                            twitterToken: token,
                            twitterSecretToken: tokenSecret,
                            twitterUsername: profile.username,
                            twitterId: profile.id,
                          },
                        },
                      },
                    },
                  },
                },
              },
              select: {
                id: true,
                name: true,
                role: true,
                memberships: {
                  select: {
                    organizationId: true,
                    role: true,
                    organization: {
                      select: {
                        id: true,
                        subscriptionStatus: true,
                      },
                    },
                  },
                },
              },
            })

            await ctx.session.$create({
              userId: user.id,
              roles: [user?.role, user?.memberships[0]?.role || MembershipRole.USER],
              orgId: user?.memberships[0]?.organization?.id,
              subscriptionStatus:
                user?.memberships[0]?.organization?.subscriptionStatus || "incomplete",
            })
            const publicData = {
              userId: user.id,
              roles: [user?.role, user?.memberships[0]?.role || MembershipRole.USER],
              orgId: user?.memberships[0]?.organization?.id,
              source: "twitter",
            }
            done(undefined, { publicData })
          } else {
            console.log(`User: ${JSON.stringify(lookedupUser)}`)
            const existingUser = lookedupUser!.organization!.memberships[0]!.user
            await ctx.session.$create({
              userId: existingUser.id,
              roles: [
                existingUser?.role,
                lookedupUser.organization.memberships[0]?.role || MembershipRole.USER,
              ],
              orgId: lookedupUser.organization.id,
              subscriptionStatus: lookedupUser?.organization?.subscriptionStatus || "incomplete",
            })
            const publicData = {
              userId: existingUser.id,
              roles: [
                existingUser?.role,
                lookedupUser!.organization?.memberships[0]?.role || MembershipRole.USER,
              ],
              orgId: lookedupUser.organization.id,
              source: "twitter",
            }
            done(undefined, { publicData })
          }
        }
      ),
    },
  ],
}))
