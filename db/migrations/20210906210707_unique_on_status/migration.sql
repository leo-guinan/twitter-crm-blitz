/*
  Warnings:

  - A unique constraint covering the columns `[twitterAccountId,relationshipType,status]` on the table `TwitterAccountStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TwitterAccountStatus.relationshipType_status_unique";

-- CreateTable
CREATE TABLE "TwitterAccountStatusHistorical" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "twitterAccountId" INTEGER NOT NULL,
    "relationshipType" "RelationshipType" NOT NULL,
    "status" "ProcessingStatus" NOT NULL,
    "before" INTEGER,
    "after" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TwitterAccountStatus.twitterAccountId_relationshipType_status_unique" ON "TwitterAccountStatus"("twitterAccountId", "relationshipType", "status");

-- AddForeignKey
ALTER TABLE "TwitterAccountStatusHistorical" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
