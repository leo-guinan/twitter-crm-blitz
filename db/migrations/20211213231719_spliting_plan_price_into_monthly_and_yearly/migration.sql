/*
  Warnings:

  - You are about to drop the column `price` on the `Plan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "price",
ADD COLUMN     "monthlyPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "yearlyPrice" DECIMAL(65,30) NOT NULL DEFAULT 0;
