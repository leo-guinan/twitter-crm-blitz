/*
  Warnings:

  - You are about to drop the column `userId` on the `TwitterDataPull` table. All the data in the column will be lost.
  - Added the required column `twitterAccountId` to the `DirectMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twitterAccountId` to the `RelationshipStaging` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twitterAccountId` to the `TwitterDataPull` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TwitterDataPull" DROP CONSTRAINT "TwitterDataPull_userId_fkey";

-- AlterTable
ALTER TABLE "DirectMessage" ADD COLUMN     "twitterAccountId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Relationship" ADD COLUMN     "twitterAccountId" INTEGER;

-- AlterTable
ALTER TABLE "RelationshipStaging" ADD COLUMN     "twitterAccountId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "twitterAccountId" INTEGER;

-- AlterTable
ALTER TABLE "TwitterDataPull" DROP COLUMN "userId",
ADD COLUMN     "twitterAccountId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserStatus" ADD COLUMN     "after" INTEGER,
ADD COLUMN     "before" INTEGER;

-- CreateTable
CREATE TABLE "TwitterAccount" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "twitterToken" TEXT,
    "twitterSecretToken" TEXT,
    "twitterBio" TEXT,
    "twitterUsername" TEXT,
    "twitterId" TEXT,
    "organizationId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "stripeCustomerId" TEXT,
    "price" TEXT,
    "subscriptionStatus" TEXT DEFAULT E'incomplete',
    "subscriptionId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membership" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT E'USER',
    "organizationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization.stripeCustomerId_unique" ON "Organization"("stripeCustomerId");

-- AddForeignKey
ALTER TABLE "TwitterAccount" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessage" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationship" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationshipStaging" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwitterDataPull" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
