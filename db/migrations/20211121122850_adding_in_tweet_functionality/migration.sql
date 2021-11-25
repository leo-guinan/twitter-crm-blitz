/*
  Warnings:

  - You are about to drop the column `conversationId` on the `Tweet` table. All the data in the column will be lost.
  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NotionIntegration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TweetNote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_twitterAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_twitterUserId_fkey";

-- DropForeignKey
ALTER TABLE "NotionIntegration" DROP CONSTRAINT "NotionIntegration_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "TweetNote" DROP CONSTRAINT "TweetNote_noteId_fkey";

-- DropForeignKey
ALTER TABLE "TweetNote" DROP CONSTRAINT "TweetNote_tweetId_fkey";

-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "conversationId",
ADD COLUMN     "inResponseToId" TEXT;

-- DropTable
DROP TABLE "Note";

-- DropTable
DROP TABLE "NotionIntegration";

-- DropTable
DROP TABLE "TweetNote";

-- CreateTable
CREATE TABLE "_liked" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_retweeted" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_liked_AB_unique" ON "_liked"("A", "B");

-- CreateIndex
CREATE INDEX "_liked_B_index" ON "_liked"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_retweeted_AB_unique" ON "_retweeted"("A", "B");

-- CreateIndex
CREATE INDEX "_retweeted_B_index" ON "_retweeted"("B");

-- AddForeignKey
ALTER TABLE "Tweet" ADD FOREIGN KEY ("inResponseToId") REFERENCES "Tweet"("tweetId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_liked" ADD FOREIGN KEY ("A") REFERENCES "Tweet"("tweetId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_liked" ADD FOREIGN KEY ("B") REFERENCES "TwitterUser"("twitterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_retweeted" ADD FOREIGN KEY ("A") REFERENCES "Tweet"("tweetId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_retweeted" ADD FOREIGN KEY ("B") REFERENCES "TwitterUser"("twitterId") ON DELETE CASCADE ON UPDATE CASCADE;
