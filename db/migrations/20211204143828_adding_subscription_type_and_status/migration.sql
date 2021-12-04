-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('PERSONAL', 'COMMUNITY', 'BUSINESS', 'FREE', 'SELF');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "status" "SubscriptionStatus" NOT NULL DEFAULT E'ACTIVE',
ADD COLUMN     "type" "SubscriptionType" NOT NULL DEFAULT E'PERSONAL';
