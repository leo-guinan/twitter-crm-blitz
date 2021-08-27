/*
  Warnings:

  - You are about to drop the column `freeDMsAvailable` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "freeDMsAvailable",
ADD COLUMN     "trialId" INTEGER;

-- CreateTable
CREATE TABLE "Trial" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "totalDMs" INTEGER NOT NULL DEFAULT 100,
    "usedDMs" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trial_userId_unique" ON "Trial"("userId");

-- AddForeignKey
ALTER TABLE "Trial" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
