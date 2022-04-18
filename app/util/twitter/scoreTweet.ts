import db from "../../../db"

export const scoreTweet = async (client, twitterId, tweetId): Promise<number> => {
  return await fetchTweetAndCalculateScore(client, twitterId, tweetId)
}

const fetchTweetAndCalculateScore = async (client, twitterId, tweetId): Promise<number> => {
  const searchParams = {
    "tweet.fields": "public_metrics,entities,created_at,author_id",
    "user.fields": "entities",
  }

  let score = -1
  await client.get(`tweets/${tweetId}`, searchParams).then(async (results) => {
    if (!results.data) return null
    const tweet = results.data
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
    console.log(public_metrics)
    score =
      public_metrics.like_count +
      4 * public_metrics.retweet_count +
      3 * public_metrics.quote_count +
      2 * public_metrics.reply_count
  })

  return score
}
