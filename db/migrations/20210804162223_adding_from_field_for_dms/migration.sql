/*
  Warnings:

  - Added the required column `from` to the `DirectMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DirectMessage" ADD COLUMN     "from" TEXT NOT NULL;
