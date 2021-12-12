-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('FREE', 'PERSONAL', 'COMMUNITY', 'PROFESSIONAL');

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "planType" "PlanType" NOT NULL DEFAULT E'FREE';
