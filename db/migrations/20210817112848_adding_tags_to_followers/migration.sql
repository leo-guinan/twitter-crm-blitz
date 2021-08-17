/*
  Warnings:

  - Added the required column `twitterUserId` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "twitterUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tag" ADD FOREIGN KEY ("twitterUserId") REFERENCES "TwitterUser"("twitterId") ON DELETE CASCADE ON UPDATE CASCADE;
