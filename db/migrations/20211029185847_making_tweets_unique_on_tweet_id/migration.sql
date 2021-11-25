/*
  Warnings:

  - The primary key for the `Tweet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tweet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TweetNote" DROP CONSTRAINT "TweetNote_tweetId_fkey";

-- AlterTable
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_pkey",
DROP COLUMN "id",
ADD PRIMARY KEY ("tweetId");

-- AlterTable
ALTER TABLE "TweetNote" ALTER COLUMN "tweetId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "TweetNote" ADD FOREIGN KEY ("tweetId") REFERENCES "Tweet"("tweetId") ON DELETE RESTRICT ON UPDATE CASCADE;
