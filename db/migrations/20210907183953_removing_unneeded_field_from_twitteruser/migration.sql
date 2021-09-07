/*
  Warnings:

  - You are about to drop the column `twitterUserTwitterId` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_twitterUserTwitterId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "twitterUserTwitterId";

-- AddForeignKey
ALTER TABLE "Tag" ADD FOREIGN KEY ("twitterUserId") REFERENCES "TwitterUser"("twitterId") ON DELETE CASCADE ON UPDATE CASCADE;
