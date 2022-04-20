/*
  Warnings:

  - A unique constraint covering the columns `[boostedTweetId,requestorTwitterAccountId,requestedTwitterAccountId]` on the table `BoostRequestRecord` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BoostRequestRecord.boostedTweetId_requestorTwitterAccountId_requestedTwitterAccountId_unique" ON "BoostRequestRecord"("boostedTweetId", "requestorTwitterAccountId", "requestedTwitterAccountId");
