/*
  Warnings:

  - You are about to drop the column `twitterAccountId` on the `TweetsToProcess` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[twitterAccountTwitterId,tweetId,action]` on the table `TweetsToProcess` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `twitterAccountTwitterId` to the `TweetsToProcess` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TweetsToProcess" DROP CONSTRAINT "TweetsToProcess_twitterAccountId_fkey";

-- DropIndex
DROP INDEX "TweetsToProcess.twitterAccountId_tweetId_action_unique";

-- AlterTable
ALTER TABLE "TweetsToProcess" DROP COLUMN "twitterAccountId",
ADD COLUMN     "twitterAccountTwitterId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TweetsToProcess.twitterAccountTwitterId_tweetId_action_unique" ON "TweetsToProcess"("twitterAccountTwitterId", "tweetId", "action");

-- AddForeignKey
ALTER TABLE "TweetsToProcess" ADD FOREIGN KEY ("twitterAccountTwitterId") REFERENCES "TwitterAccount"("twitterId") ON DELETE RESTRICT ON UPDATE CASCADE;
