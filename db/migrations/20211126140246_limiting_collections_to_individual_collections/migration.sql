/*
  Warnings:

  - You are about to drop the `_SubscriptionToTweetCollection` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subscriptionId` to the `TweetCollection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SubscriptionToTweetCollection" DROP CONSTRAINT "_SubscriptionToTweetCollection_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubscriptionToTweetCollection" DROP CONSTRAINT "_SubscriptionToTweetCollection_B_fkey";

-- AlterTable
ALTER TABLE "TweetCollection" ADD COLUMN     "subscriptionId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_SubscriptionToTweetCollection";

-- AddForeignKey
ALTER TABLE "TweetCollection" ADD FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
