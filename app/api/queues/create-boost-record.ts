import db from "db"
import { Queue } from "quirrel/next"
import { getClientForAccount } from "../../util/twitter/client"
import { scoreTweet } from "../../util/twitter/scoreTweet"

export default Queue(
  "api/queues/create-boost-record",
  async ({ tweetId, requestingAccountId, requestedAccountId }) => {
    const client = await getClientForAccount(requestingAccountId)
    const score = await scoreTweet(client, requestingAccountId, tweetId)

    const tweet = await db.tweet.findFirst({
      where: {
        tweetId,
      },
      include: {
        authorAccount: true,
      },
    })
    if (!tweet) {
      throw new Error("Tweet not found")
    }
    if (!tweet.authorAccount) {
      throw new Error("Tweet has no author")
    }
    await db.boostRequestRecord.create({
      data: {
        authorUsername: tweet.authorAccount.twitterUsername
          ? tweet.authorAccount.twitterUsername
          : "",
        tweetMessage: tweet.message,
        engagementScore: score,
        boostedTweet: {
          connect: {
            tweetId,
          },
        },
        boostedTweetAuthor: {
          connect: {
            id: tweet.authorAccount.id,
          },
        },
        requestorTwitterAccount: {
          connect: {
            id: requestingAccountId,
          },
        },
        requestedTwitterAccount: {
          connect: {
            id: requestedAccountId,
          },
        },
      },
    })
  },
  {}
)
