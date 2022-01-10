/*
  Warnings:

  - You are about to drop the column `authorId` on the `Tweet` table. All the data in the column will be lost.
  - You are about to drop the `TwitterUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SubscriptionToTwitterUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_liked` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_retweeted` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_authorId_fkey";

-- DropForeignKey
ALTER TABLE "_SubscriptionToTwitterUser" DROP CONSTRAINT "_SubscriptionToTwitterUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubscriptionToTwitterUser" DROP CONSTRAINT "_SubscriptionToTwitterUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_liked" DROP CONSTRAINT "_liked_A_fkey";

-- DropForeignKey
ALTER TABLE "_liked" DROP CONSTRAINT "_liked_B_fkey";

-- DropForeignKey
ALTER TABLE "_retweeted" DROP CONSTRAINT "_retweeted_A_fkey";

-- DropForeignKey
ALTER TABLE "_retweeted" DROP CONSTRAINT "_retweeted_B_fkey";

-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "authorId";

-- DropTable
DROP TABLE "TwitterUser";

-- DropTable
DROP TABLE "_SubscriptionToTwitterUser";

-- DropTable
DROP TABLE "_liked";

-- DropTable
DROP TABLE "_retweeted";

-- CreateTable
CREATE TABLE "DailyEngagementRecord" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "engagementScore" INTEGER NOT NULL DEFAULT 0,
    "weightedEngagementScore" INTEGER NOT NULL DEFAULT 0,
    "primaryTwitterAccountId" INTEGER NOT NULL,
    "engagingTwitterAccountId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DailyEngagementRecord" ADD FOREIGN KEY ("primaryTwitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyEngagementRecord" ADD FOREIGN KEY ("engagingTwitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
