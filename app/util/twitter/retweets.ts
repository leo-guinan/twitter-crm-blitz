import db, { TweetAction } from "../../../db"

export const getRetweets = async (client, twitterId, tweetId) => {
  console.log("Getting retweets for Tweet:", tweetId)

  const params = {
    "user.fields": "id,name,username,profile_image_url",
  }
  await client
    .get("tweets/" + tweetId + "/retweeted_by", params)
    .then(async (results) => {
      if (results && results.data) {
        results.data.map(async (user) => {
          try {
            await db.tweet.update({
              where: {
                tweetId,
              },
              data: {
                retweets: {
                  connectOrCreate: {
                    where: {
                      twitterId: user.id,
                    },
                    create: {
                      twitterId: user.id,
                      twitterName: user.name,
                      twitterUsername: user.username,
                      twitterProfilePictureUrl: user.profile_image_url,
                    },
                  },
                },
              },
            })
          } catch (e) {
            console.log("Error saving retweet. Trying again due to probable race condition.")
            await db.tweet.update({
              where: {
                tweetId,
              },
              data: {
                retweets: {
                  connectOrCreate: {
                    where: {
                      twitterId: user.id,
                    },
                    create: {
                      twitterId: user.id,
                      twitterName: user.name,
                      twitterUsername: user.username,
                      twitterProfilePictureUrl: user.profile_image_url,
                    },
                  },
                },
              },
            })
          }
        })
      }
    })
    .catch(async (e) => {
      await db.twitterAccount.update({
        where: {
          twitterId,
        },
        data: {
          rateLimited: true,
        },
      })
      await db.tweetsToProcess.create({
        data: {
          twitterAccount: {
            connect: {
              twitterId,
            },
          },
          tweet: {
            connect: {
              tweetId,
            },
          },
          action: TweetAction.RETWEET,
        },
      })
      if ("errors" in e) {
        // Twitter API error
        if (e.errors[0].code === 88) {
          // rate limit exceeded
          console.log(
            "Rate limit will reset on",
            new Date(e._headers.get("x-rate-limit-reset") * 1000)
          )
        } else {
          console.error(e)
        }
      } else {
        console.error(e)
      }
    })
}
