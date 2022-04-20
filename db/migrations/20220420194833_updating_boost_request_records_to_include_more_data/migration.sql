/*
  Warnings:

  - You are about to drop the `AmplifierInBoostRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BoostRequest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `requestedTwitterAccountId` to the `BoostRequestRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BoostRequestRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AmplifierInBoostRequest" DROP CONSTRAINT "AmplifierInBoostRequest_amplifierId_fkey";

-- DropForeignKey
ALTER TABLE "AmplifierInBoostRequest" DROP CONSTRAINT "AmplifierInBoostRequest_boostRequestId_fkey";

-- DropForeignKey
ALTER TABLE "BoostRequest" DROP CONSTRAINT "BoostRequest_tweetId_fkey";

-- AlterTable
ALTER TABLE "BoostRequestRecord" ADD COLUMN     "requestedTwitterAccountId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "visited" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "AmplifierInBoostRequest";

-- DropTable
DROP TABLE "BoostRequest";

-- AddForeignKey
ALTER TABLE "BoostRequestRecord" ADD FOREIGN KEY ("requestedTwitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
