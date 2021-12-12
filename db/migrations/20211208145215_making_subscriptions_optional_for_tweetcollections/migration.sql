-- DropForeignKey
ALTER TABLE "TweetCollection" DROP CONSTRAINT "TweetCollection_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "TweetCollection" ALTER COLUMN "subscriptionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TweetCollection" ADD FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
