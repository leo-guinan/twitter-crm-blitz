/*
  Warnings:

  - You are about to drop the column `addedToSendgrid` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "addedToSendgrid",
ADD COLUMN     "addedToConvertkit" BOOLEAN NOT NULL DEFAULT false;
