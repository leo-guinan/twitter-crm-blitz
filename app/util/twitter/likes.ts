import db, { TweetAction } from "../../../db"

export const getLikes = async (client, twitterId, tweetId) => {
  const likeParams = {
    "user.fields": "id,name,username,profile_image_url",
  }
  await client
    .get("tweets/" + tweetId + "/liking_users", likeParams)
    .then((results) => {
      if (results && results.data) {
        results.data.map(async (user) => {
          try {
            await db.tweet.update({
              where: {
                tweetId,
              },
              data: {
                likes: {
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
            console.log("Error saving liked tweet, trying again due to potential race condition.")
            await db.tweet.update({
              where: {
                tweetId,
              },
              data: {
                likes: {
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
      await db.tweetsToProcess.upsert({
        where: {
          twitterAccountTwitterId_tweetId_action: {
            twitterAccountTwitterId: twitterId,
            tweetId,
            action: TweetAction.LIKE,
          },
        },
        create: {
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
          action: TweetAction.LIKE,
        },
        update: {},
      })
      if ("errors" in e) {
        console.log("This should be where the rate error ends up")
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
