/*
  Warnings:

  - The `role` column on the `Membership` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[organizationId,invitedEmail]` on the table `Membership` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "MembershipRole" AS ENUM ('OWNER', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "GlobalRole" AS ENUM ('SUPERADMIN', 'CUSTOMER');

-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "invitedEmail" TEXT,
ADD COLUMN     "invitedName" TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "MembershipRole" NOT NULL DEFAULT E'USER';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "GlobalRole" NOT NULL DEFAULT E'CUSTOMER';

-- CreateIndex
CREATE UNIQUE INDEX "Membership.organizationId_invitedEmail_unique" ON "Membership"("organizationId", "invitedEmail");
