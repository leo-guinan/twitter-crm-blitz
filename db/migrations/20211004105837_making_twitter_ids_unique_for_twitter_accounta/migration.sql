/*
  Warnings:

  - A unique constraint covering the columns `[twitterId]` on the table `TwitterAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TwitterAccount.twitterId_unique" ON "TwitterAccount"("twitterId");
