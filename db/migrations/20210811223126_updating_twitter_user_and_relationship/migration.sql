/*
  Warnings:

  - The primary key for the `Relationship` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Relationship` table. All the data in the column will be lost.
  - You are about to drop the column `relationId` on the `Relationship` table. All the data in the column will be lost.
  - You are about to drop the column `directMessageId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `relationId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the `Relation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[hashedToken,type]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `twitterUserId` to the `Relationship` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('RESET_PASSWORD');

-- DropForeignKey
ALTER TABLE "Relationship" DROP CONSTRAINT "Relationship_relationId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_directMessageId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_relationId_fkey";

-- DropIndex
DROP INDEX "Relationship_relationId_unique";

-- AlterTable
ALTER TABLE "Relationship" DROP CONSTRAINT "Relationship_pkey",
DROP COLUMN "id",
DROP COLUMN "relationId",
ADD COLUMN     "twitterUserId" TEXT NOT NULL,
ADD PRIMARY KEY ("userId", "twitterUserId");

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "directMessageId",
DROP COLUMN "relationId";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "type",
ADD COLUMN     "type" "TokenType" NOT NULL;

-- DropTable
DROP TABLE "Relation";

-- CreateTable
CREATE TABLE "TwitterUser" (
    "twitterId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "profilePictureUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("twitterId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token.hashedToken_type_unique" ON "Token"("hashedToken", "type");

-- AddForeignKey
ALTER TABLE "Relationship" ADD FOREIGN KEY ("twitterUserId") REFERENCES "TwitterUser"("twitterId") ON DELETE CASCADE ON UPDATE CASCADE;
