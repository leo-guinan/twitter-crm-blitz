/*
  Warnings:

  - You are about to drop the column `amplfied` on the `BoostRequestRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BoostRequestRecord" DROP COLUMN "amplfied",
ADD COLUMN     "amplified" BOOLEAN NOT NULL DEFAULT false;
