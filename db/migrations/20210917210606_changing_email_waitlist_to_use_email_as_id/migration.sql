/*
  Warnings:

  - The primary key for the `EmailWaitlist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `EmailWaitlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmailWaitlist" DROP CONSTRAINT "EmailWaitlist_pkey",
DROP COLUMN "id",
ADD PRIMARY KEY ("email");
