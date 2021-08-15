/*
  Warnings:

  - You are about to drop the column `value` on the `Relationship` table. All the data in the column will be lost.
  - You are about to drop the column `followerId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the `Follower` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[relationId]` on the table `Relationship` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `relationId` to the `Relationship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Relationship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Relationship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_relationshipId_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_followerId_fkey";

-- AlterTable
ALTER TABLE "Relationship" DROP COLUMN "value",
ADD COLUMN     "relationId" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "followerId",
ADD COLUMN     "relationId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "twitterId" TEXT;

-- DropTable
DROP TABLE "Follower";

-- CreateTable
CREATE TABLE "Relation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT,
    "twitterId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Relationship_relationId_unique" ON "Relationship"("relationId");

-- AddForeignKey
ALTER TABLE "Tag" ADD FOREIGN KEY ("relationId") REFERENCES "Relation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationship" ADD FOREIGN KEY ("relationId") REFERENCES "Relation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationship" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
