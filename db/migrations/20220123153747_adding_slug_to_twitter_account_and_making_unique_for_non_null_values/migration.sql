/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `TwitterAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TwitterAccount" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "TwitterAccount.slug_unique" ON "TwitterAccount"("slug");
