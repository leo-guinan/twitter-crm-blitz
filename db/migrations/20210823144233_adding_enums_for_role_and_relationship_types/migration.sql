/*
  Warnings:

  - The primary key for the `Relationship` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `type` on the `Relationship` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RelationshipType" AS ENUM ('FOLLOWER', 'FOLLOWING', 'MUTUAL');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Relationship" DROP CONSTRAINT "Relationship_pkey",
DROP COLUMN "type",
ADD COLUMN     "type" "RelationshipType" NOT NULL,
ADD PRIMARY KEY ("userId", "twitterUserId", "type");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT E'USER';
