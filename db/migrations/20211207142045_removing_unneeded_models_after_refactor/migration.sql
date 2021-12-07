/*
  Warnings:

  - You are about to drop the column `trialId` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `twitterAccountWaitlistId` on the `TwitterAccount` table. All the data in the column will be lost.
  - You are about to drop the `DirectMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmailWaitlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InviteCode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Relationship` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RelationshipEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RelationshipStaging` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TwitterAccountStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TwitterAccountStatusHistorical` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TwitterAccountWaitList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TwitterDataPull` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DirectMessage" DROP CONSTRAINT "DirectMessage_twitterAccountId_fkey";

-- DropForeignKey
ALTER TABLE "EmailWaitlist" DROP CONSTRAINT "EmailWaitlist_inviteCodeId_fkey";

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
ALTER TABLE "Trial" DROP CONSTRAINT "Trial_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "TwitterAccountStatus" DROP CONSTRAINT "TwitterAccountStatus_twitterAccountId_fkey";

-- DropForeignKey
ALTER TABLE "TwitterAccountStatusHistorical" DROP CONSTRAINT "TwitterAccountStatusHistorical_twitterAccountId_fkey";

-- DropForeignKey
ALTER TABLE "TwitterAccountWaitList" DROP CONSTRAINT "TwitterAccountWaitList_twitterAccountId_fkey";

-- DropForeignKey
ALTER TABLE "TwitterDataPull" DROP CONSTRAINT "TwitterDataPull_twitterAccountId_fkey";

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "trialId";

-- AlterTable
ALTER TABLE "TwitterAccount" DROP COLUMN "twitterAccountWaitlistId";

-- DropTable
DROP TABLE "DirectMessage";

-- DropTable
DROP TABLE "EmailWaitlist";

-- DropTable
DROP TABLE "InviteCode";

-- DropTable
DROP TABLE "Relationship";

-- DropTable
DROP TABLE "RelationshipEvent";

-- DropTable
DROP TABLE "RelationshipStaging";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "Trial";

-- DropTable
DROP TABLE "TwitterAccountStatus";

-- DropTable
DROP TABLE "TwitterAccountStatusHistorical";

-- DropTable
DROP TABLE "TwitterAccountWaitList";

-- DropTable
DROP TABLE "TwitterDataPull";

-- DropEnum
DROP TYPE "ProcessingStatus";

-- DropEnum
DROP TYPE "RelationshipEventType";

-- DropEnum
DROP TYPE "RelationshipType";
