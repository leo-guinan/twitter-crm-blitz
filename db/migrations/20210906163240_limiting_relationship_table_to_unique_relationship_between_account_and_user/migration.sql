/*
  Warnings:

  - The primary key for the `Relationship` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `relationshipType` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_twitterAccountId_twitterUserId_relationshipType_fkey";

-- AlterTable
ALTER TABLE "Relationship" DROP CONSTRAINT "Relationship_pkey",
ADD PRIMARY KEY ("twitterAccountId", "twitterUserId");

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "relationshipType";

-- AddForeignKey
ALTER TABLE "Tag" ADD FOREIGN KEY ("twitterAccountId", "twitterUserId") REFERENCES "Relationship"("twitterAccountId", "twitterUserId") ON DELETE CASCADE ON UPDATE CASCADE;
