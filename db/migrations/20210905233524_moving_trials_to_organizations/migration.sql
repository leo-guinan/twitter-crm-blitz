/*
  Warnings:

  - You are about to drop the column `userId` on the `Trial` table. All the data in the column will be lost.
  - You are about to drop the column `trialId` on the `User` table. All the data in the column will be lost.
  - Made the column `organizationId` on table `Trial` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Trial" DROP CONSTRAINT "Trial_userId_fkey";

-- DropIndex
DROP INDEX "Trial_userId_unique";

-- AlterTable
ALTER TABLE "Trial" DROP COLUMN "userId",
ALTER COLUMN "organizationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "trialId";

-- DropEnum
DROP TYPE "UserRole";
