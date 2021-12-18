/*
  Warnings:

  - You are about to drop the column `stripePlanId` on the `Plan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "stripePlanId",
ADD COLUMN     "stripeAnnualPlanId" TEXT,
ADD COLUMN     "stripeMonthlyPlanId" TEXT;
