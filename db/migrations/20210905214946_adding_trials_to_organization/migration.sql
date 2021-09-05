/*
  Warnings:

  - A unique constraint covering the columns `[organizationId]` on the table `Trial` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "trialId" INTEGER;

-- AlterTable
ALTER TABLE "Trial" ADD COLUMN     "organizationId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Trial_organizationId_unique" ON "Trial"("organizationId");

-- AddForeignKey
ALTER TABLE "Trial" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
