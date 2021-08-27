/*
  Warnings:

  - Added the required column `relationshipType` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_twitterUserId_fkey";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "relationshipType" "RelationshipType" NOT NULL;

-- AddForeignKey
ALTER TABLE "Tag" ADD FOREIGN KEY ("userId", "twitterUserId", "relationshipType") REFERENCES "Relationship"("userId", "twitterUserId", "type") ON DELETE CASCADE ON UPDATE CASCADE;
