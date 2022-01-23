/*
  Warnings:

  - You are about to drop the column `value` on the `DataFieldValue` table. All the data in the column will be lost.
  - Added the required column `tweetId` to the `DataFieldValue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataFieldValue" DROP COLUMN "value",
ADD COLUMN     "tweetId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "DataFieldValue" ADD FOREIGN KEY ("tweetId") REFERENCES "Tweet"("tweetId") ON DELETE RESTRICT ON UPDATE CASCADE;
