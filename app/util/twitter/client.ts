import db from "../../../db"
import Twitter from "twitter-lite"

export const getClientForAccount = async (twitterAccount) => {
  let client

  if (!twitterAccount.twitterToken) {
    client = new Twitter({
      subdomain: "api", // "api" is the default (change for other subdomains)
      version: "2", // version "1.1" is the default (change for other subdomains)
      extension: false,
      consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
      bearer_token: process.env.TWITTER_BEARER_TOKEN as string,
    })
  } else {
    client = new Twitter({
      subdomain: "api", // "api" is the default (change for other subdomains)
      version: "2", // version "1.1" is the default (change for other subdomains)
      extension: false,
      consumer_key: process.env.TWITTER_CONSUMER_KEY as string, // from Twitter.
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string, // from Twitter.
      access_token_key: twitterAccount.twitterToken as string, // from your User (oauth_token)
      access_token_secret: twitterAccount.twitterSecretToken as string, // from your User (oauth_token_secret)
    })
  }
  return client
}
