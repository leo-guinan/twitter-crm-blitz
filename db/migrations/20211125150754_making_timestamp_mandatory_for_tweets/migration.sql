/*
  Warnings:

  - Made the column `tweetCreatedAt` on table `Tweet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tweet" ALTER COLUMN "tweetCreatedAt" SET NOT NULL;
