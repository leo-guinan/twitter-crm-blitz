-- CreateEnum
CREATE TYPE "SubscriptionCadence" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "cadence" "SubscriptionCadence" NOT NULL DEFAULT E'WEEKLY';

-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "tweetCreatedAt" TIMESTAMP(3);
