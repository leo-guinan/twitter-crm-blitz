/*
  Warnings:

  - You are about to drop the `UserStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserStatus" DROP CONSTRAINT "UserStatus_userId_fkey";

-- DropTable
DROP TABLE "UserStatus";

-- CreateTable
CREATE TABLE "TwitterAccountStatus" (
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

-- AddForeignKey
ALTER TABLE "TwitterAccountStatus" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
