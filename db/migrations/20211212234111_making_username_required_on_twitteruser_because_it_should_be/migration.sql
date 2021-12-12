/*
  Warnings:

  - Made the column `username` on table `TwitterUser` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TwitterUser" ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "username" SET DEFAULT E'';
