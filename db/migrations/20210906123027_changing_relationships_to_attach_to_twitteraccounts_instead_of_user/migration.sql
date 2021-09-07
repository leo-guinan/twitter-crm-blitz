/*
  Warnings:

  - You are about to drop the column `userId` on the `DirectMessage` table. All the data in the column will be lost.
  - The primary key for the `Relationship` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Relationship` table. All the data in the column will be lost.
  - The primary key for the `RelationshipStaging` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `RelationshipStaging` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Tag` table. All the data in the column will be lost.
  - Made the column `twitterAccountId` on table `Relationship` required. This step will fail if there are existing NULL values in that column.
  - Made the column `twitterUserTwitterId` on table `Tag` required. This step will fail if there are existing NULL values in that column.
  - Made the column `twitterAccountId` on table `Tag` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "DirectMessage" DROP CONSTRAINT "DirectMessage_userId_fkey";

-- DropForeignKey
ALTER TABLE "Relationship" DROP CONSTRAINT "Relationship_userId_fkey";

-- DropForeignKey
ALTER TABLE "RelationshipStaging" DROP CONSTRAINT "RelationshipStaging_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_userId_twitterUserId_relationshipType_fkey";

-- AlterTable
ALTER TABLE "DirectMessage" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Relationship" DROP CONSTRAINT "Relationship_pkey",
DROP COLUMN "userId",
ALTER COLUMN "twitterAccountId" SET NOT NULL,
ADD PRIMARY KEY ("twitterAccountId", "twitterUserId", "type");

-- AlterTable
ALTER TABLE "RelationshipStaging" DROP CONSTRAINT "RelationshipStaging_pkey",
DROP COLUMN "userId",
ADD PRIMARY KEY ("twitterAccountId", "twitterUserId", "type");

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "userId",
ALTER COLUMN "twitterUserTwitterId" SET NOT NULL,
ALTER COLUMN "twitterAccountId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Tag" ADD FOREIGN KEY ("twitterAccountId", "twitterUserId", "relationshipType") REFERENCES "Relationship"("twitterAccountId", "twitterUserId", "type") ON DELETE CASCADE ON UPDATE CASCADE;
