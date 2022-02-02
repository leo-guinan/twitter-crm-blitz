/*
  Warnings:

  - A unique constraint covering the columns `[twitterAccountId,tweetId,action]` on the table `TweetsToProcess` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TweetsToProcess.twitterAccountId_tweetId_action_unique" ON "TweetsToProcess"("twitterAccountId", "tweetId", "action");
