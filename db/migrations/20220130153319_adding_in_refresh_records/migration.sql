/*
  Warnings:

  - A unique constraint covering the columns `[verificationString]` on the table `OffSiteSubscribersToVerify` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TweetAction" AS ENUM ('LIKE', 'RETWEET', 'COMMENT', 'QUOTE');

-- CreateTable
CREATE TABLE "TweetsToProcess" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tweetId" TEXT NOT NULL,
    "twitterAccountId" INTEGER NOT NULL,
    "action" "TweetAction" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwitterAccountToProcess" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "twitterAccountId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OffSiteSubscribersToVerify.verificationString_unique" ON "OffSiteSubscribersToVerify"("verificationString");

-- AddForeignKey
ALTER TABLE "TweetsToProcess" ADD FOREIGN KEY ("tweetId") REFERENCES "Tweet"("tweetId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TweetsToProcess" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwitterAccountToProcess" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
