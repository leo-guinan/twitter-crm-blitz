/*
  Warnings:

  - You are about to drop the `TwitterDataPulls` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TwitterDataPulls" DROP CONSTRAINT "TwitterDataPulls_userId_fkey";

-- DropTable
DROP TABLE "TwitterDataPulls";

-- CreateTable
CREATE TABLE "TwitterDataPull" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "relationshipType" "RelationshipType" NOT NULL,
    "paginationToken" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TwitterDataPull" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
