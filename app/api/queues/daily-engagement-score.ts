import { CronJob } from "quirrel/next"
import db from "db"
import { v4 as uuidv4 } from "uuid"

export default CronJob(
  "api/queues/daily-engagement-score", // 👈 the route that it's reachable on
  "0 0 * * *", // once a day at 12am
  async () => {
    const usersToProcess = await db.twitterAccount.findMany({
      where: {
        twitterToken: {
          not: null,
        },
      },
    })

    for (const account of usersToProcess) {
      const reportId = uuidv4()

      const latestTweets = await db.tweet.findMany({
        where: {
          authorAccountId: account.id,
          tweetCreatedAt: {
            gt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
          },
        },
        select: {
          likes: true,
          retweets: true,
        },
      })
      const twitterAccounts = {}
      const calced = latestTweets.map((tweet) => {
        if (tweet.likes.length === 0 && tweet.retweets.length === 0) {
          //pass
        } else {
          const stats = {}
          for (const like of tweet.likes) {
            if (!twitterAccounts[like.id]) {
              twitterAccounts[like.id] = like
            }
            //save like to twitter account key
            if (!stats[like.id]) {
              stats[like.id] = {
                likes: 1,
                retweets: 0,
              }
            } else {
              stats[like.id].likes += 1
            }
          }
          for (const retweet of tweet.retweets) {
            if (!twitterAccounts[retweet.id]) {
              twitterAccounts[retweet.id] = retweet
            }
            //save retweet to twitter account key
            if (!stats[retweet.id]) {
              stats[retweet.id] = {
                likes: 0,
                retweets: 1,
              }
            } else {
              stats[retweet.id].retweets += 1
            }
          }
          return stats
        }
      })

      const stats: undefined | { [key: string]: { likes: number; retweets: number } } = calced
        ?.filter((item) => !!item && item)
        ?.reduce(
          (
            acc: { [key: string]: { likes: number; retweets: number } },
            cur: { [key: string]: { likes: number; retweets: number } }
          ) => {
            if (!acc) {
              return cur
            }

            for (const [key, value] of Object.entries(cur)) {
              if (!acc[key]) {
                acc[key] = { likes: value.likes, retweets: value.retweets }
              } else {
                acc[key]!.likes += value.likes
                acc[key]!.retweets += value.retweets
              }
            }
            return acc
          },
          {}
        )
      if (stats) {
        const totals = Object.entries(stats)
          .map(([key, value]) => {
            return {
              id: key,
              likes: value.likes,
              retweets: value.retweets,
            }
          })
          .filter((item) => parseInt(item.id) !== account.id)
        for (const total of totals) {
          await db.dailyEngagementRecord.create({
            data: {
              reportRun: reportId,
              engagementScore: total.likes + total.retweets,
              weightedEngagementScore: total.likes + 2 * total.retweets,
              primaryTwitterAccount: {
                connect: {
                  id: account.id,
                },
              },
              engagingTwitterAccount: {
                connect: {
                  id: parseInt(total.id),
                },
              },
            },
          })
        }
      }
    }
  }
)
