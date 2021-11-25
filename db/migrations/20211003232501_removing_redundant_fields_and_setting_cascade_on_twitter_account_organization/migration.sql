/*
  Warnings:

  - You are about to drop the column `price` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionStatus` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitterBio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitterId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitterSecretToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitterToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitterUsername` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DirectMessage" DROP CONSTRAINT "DirectMessage_twitterAccountId_fkey";

-- DropForeignKey
ALTER TABLE "EmailWaitlist" DROP CONSTRAINT "EmailWaitlist_inviteCodeId_fkey";

-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_userId_fkey";

-- DropForeignKey
ALTER TABLE "Relationship" DROP CONSTRAINT "Relationship_twitterAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Relationship" DROP CONSTRAINT "Relationship_twitterUserId_fkey";

-- DropForeignKey
ALTER TABLE "RelationshipEvent" DROP CONSTRAINT "RelationshipEvent_twitterAccountId_fkey";

-- DropForeignKey
ALTER TABLE "RelationshipEvent" DROP CONSTRAINT "RelationshipEvent_twitterAccountId_twitterUserId_fkey";

-- DropForeignKey
ALTER TABLE "RelationshipEvent" DROP CONSTRAINT "RelationshipEvent_twitterUserId_fkey";

-- DropForeignKey
ALTER TABLE "RelationshipStaging" DROP CONSTRAINT "RelationshipStaging_twitterAccountId_fkey";

-- DropForeignKey
ALTER TABLE "RelationshipStaging" DROP CONSTRAINT "RelationshipStaging_twitterUserId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_twitterAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_twitterAccountId_twitterUserId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_twitterUserId_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- DropForeignKey
ALTER TABLE "Trial" DROP CONSTRAINT "Trial_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "TwitterAccount" DROP CONSTRAINT "TwitterAccount_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "TwitterAccountStatus" DROP CONSTRAINT "TwitterAccountStatus_twitterAccountId_fkey";

-- DropForeignKey
ALTER TABLE "TwitterAccountStatusHistorical" DROP CONSTRAINT "TwitterAccountStatusHistorical_twitterAccountId_fkey";

-- DropForeignKey
ALTER TABLE "TwitterDataPull" DROP CONSTRAINT "TwitterDataPull_twitterAccountId_fkey";

-- DropIndex
DROP INDEX "User.stripeCustomerId_unique";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "price",
DROP COLUMN "stripeCustomerId",
DROP COLUMN "subscriptionId",
DROP COLUMN "subscriptionStatus",
DROP COLUMN "twitterBio",
DROP COLUMN "twitterId",
DROP COLUMN "twitterSecretToken",
DROP COLUMN "twitterToken",
DROP COLUMN "twitterUsername";

-- AddForeignKey
ALTER TABLE "TwitterAccount" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessage" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD FOREIGN KEY ("twitterAccountId", "twitterUserId") REFERENCES "Relationship"("twitterAccountId", "twitterUserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD FOREIGN KEY ("twitterUserId") REFERENCES "TwitterUser"("twitterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationship" ADD FOREIGN KEY ("twitterUserId") REFERENCES "TwitterUser"("twitterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationship" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationshipStaging" ADD FOREIGN KEY ("twitterUserId") REFERENCES "TwitterUser"("twitterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationshipStaging" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwitterDataPull" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trial" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwitterAccountStatus" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwitterAccountStatusHistorical" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationshipEvent" ADD FOREIGN KEY ("twitterUserId") REFERENCES "TwitterUser"("twitterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationshipEvent" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationshipEvent" ADD FOREIGN KEY ("twitterAccountId", "twitterUserId") REFERENCES "Relationship"("twitterAccountId", "twitterUserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailWaitlist" ADD FOREIGN KEY ("inviteCodeId") REFERENCES "InviteCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;
