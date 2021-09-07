/*
  Warnings:

  - A unique constraint covering the columns `[twitterAccountId,relationshipType]` on the table `TwitterAccountStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TwitterAccountStatus.twitterAccountId_relationshipType_status_u";

-- CreateIndex
CREATE UNIQUE INDEX "TwitterAccountStatus.twitterAccountId_relationshipType_unique" ON "TwitterAccountStatus"("twitterAccountId", "relationshipType");
