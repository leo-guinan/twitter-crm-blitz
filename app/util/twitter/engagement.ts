import db from "../../../db"
import { getLikes } from "./likes"
import { getRetweets } from "./retweets"

export const getEngagement = async (client, twitterId) => {
  console.log(`Getting engagement for ${twitterId}`)
  const searchParams = {
    query: `from:${twitterId}`,
    max_results: 100,
    "tweet.fields": "public_metrics,entities,created_at,author_id",
    "user.fields": "entities",
  }

  client
    .get("tweets/search/recent", searchParams)
    .then((results) => {
      if (results && results.data) {
        console.log(results.data.length)
        results.data.map(async (tweet) => {
          await db.tweet.upsert({
            where: {
              tweetId: tweet.id,
            },
            create: {
              tweetId: tweet.id,
              message: tweet.text,
              tweetCreatedAt: tweet.created_at,
              authorAccount: {
                connectOrCreate: {
                  where: {
                    twitterId: tweet.author_id,
                  },
                  create: {
                    twitterId: tweet.author_id,
                  },
                },
              },
            },
            update: {
              authorAccount: {
                connectOrCreate: {
                  where: {
                    twitterId: tweet.author_id,
                  },
                  create: {
                    twitterId: tweet.author_id,
                  },
                },
              },
            },
          })
          const public_metrics = tweet.public_metrics
          if (public_metrics.like_count > 0) {
            await getLikes(client, twitterId, tweet.id)
          }
          if (public_metrics.retweet_count > 0) {
            await getRetweets(client, twitterId, tweet.id)
          }
          if (public_metrics.quote_count > 0) {
            //TODO: get quoted tweets
          }
          if (public_metrics.reply_count > 0) {
            //TODO: get replied tweets
          }
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
