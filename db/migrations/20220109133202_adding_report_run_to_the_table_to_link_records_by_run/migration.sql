/*
  Warnings:

  - Added the required column `reportRun` to the `DailyEngagementRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DailyEngagementRecord" ADD COLUMN     "reportRun" TEXT NOT NULL;
