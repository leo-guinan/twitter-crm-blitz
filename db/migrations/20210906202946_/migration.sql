/*
  Warnings:

  - A unique constraint covering the columns `[relationshipType,status]` on the table `TwitterAccountStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TwitterAccountStatus.relationshipType_status_unique" ON "TwitterAccountStatus"("relationshipType", "status");
