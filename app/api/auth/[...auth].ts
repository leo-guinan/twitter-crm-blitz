// // app/api/auth/[...auth].ts
import { passportAuth } from "blitz"

import TwitterStrategy from "passport-twitter"
import db, { MembershipRole, TwitterAccountRefreshReportStatus } from "db"
import twitterEngagement from "../queues/twitter-engagement"

export default passportAuth(({ ctx, req, res }) => ({
  successRedirectUrl: "/feather",
  errorRedirectUrl: "/",
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
          const email = profile.emails && profile.emails[0]?.value

          const twitterAccountLoggingIn = await db.twitterAccount.upsert({
            where: {
              twitterId: profile.id,
            },
            create: {
              twitterToken: token,
              twitterSecretToken: tokenSecret,
              twitterUsername: profile.username,
              twitterId: profile.id,
            },
            update: {
              twitterToken: token,
              twitterSecretToken: tokenSecret,
              twitterUsername: profile.username,
            },
            select: {
              createdAt: true,
              updatedAt: true,
              twitterToken: true,
              twitterSecretToken: true,
              twitterUsername: true,
              twitterId: true,
              organization: {
                select: {
                  id: true,
                  name: true,
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
          let organization
          let orgId
          let subscriptionStatus = "incomplete"
          const roles: any[] = []

          if (!twitterAccountLoggingIn.organization) {
            console.log("No organization found for twitter account. Creating one.")
            organization = await db.organization.create({
              data: {
                name: "",
                memberships: {
                  create: {
                    role: "OWNER",
                    user: {
                      create: {
                        role: "CUSTOMER",
                        email: email,
                      },
                    },
                  },
                },
                twitterAccounts: {
                  connect: {
                    twitterId: profile.id,
                  },
                },
              },
              select: {
                id: true,
                name: true,
                subscriptionStatus: true,
                memberships: {
                  select: {
                    role: true,
                    user: {
                      select: {
                        id: true,
                        role: true,
                        email: true,

                        memberships: true,
                      },
                    },
                  },
                },
              },
            })
            if (organization) {
              console.log("Organization created")
              roles.push(organization.memberships[0].user.role)
              roles.push(organization.memberships[0].role)
              orgId = organization.id
            }
            const report = await db.dailyRefreshReport.create({
              data: {},
            })
            const twitterAccountRefreshReport = await db.twitterAccountRefreshReport.create({
              data: {
                status: TwitterAccountRefreshReportStatus.QUEUED,
                containingDailyReport: {
                  connect: {
                    id: report.id,
                  },
                },
                twitterAccount: {
                  connect: {
                    twitterId: profile.id,
                  },
                },
              },
            })
            await twitterEngagement.enqueue({
              twitterAccountTwitterId: profile.id,
              reportId: twitterAccountRefreshReport.id,
            })
          } else {
            roles.push(twitterAccountLoggingIn?.organization?.memberships[0]?.user.role)
            roles.push(twitterAccountLoggingIn?.organization?.memberships[0]?.role)
            orgId = twitterAccountLoggingIn.organization.id
          }

          const user = organization
            ? organization.memberships[0].user
            : twitterAccountLoggingIn?.organization?.memberships[0]?.user

          if (user) {
            await ctx.session.$create({
              userId: user.id,
              roles,
              orgId,
              subscriptionStatus,
            })
            const publicData = {
              userId: user.id,
              roles,
              orgId,
              source: "twitter",
            }
            done(undefined, { publicData })
          } else {
            done(undefined, {
              publicData: {
                userId: null,
                roles: [],
                orgId: null,
                source: "twitter",
              },
            })
          }
        }
      ),
    },
  ],
}))
