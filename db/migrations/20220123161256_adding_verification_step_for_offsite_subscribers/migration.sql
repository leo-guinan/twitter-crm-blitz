-- AlterEnum
ALTER TYPE "PlanType" ADD VALUE 'CREATOR';

-- AlterEnum
ALTER TYPE "SubscriptionType" ADD VALUE 'CREATOR';

-- CreateTable
CREATE TABLE "OffSiteSubscriber" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OffSiteSubscribersToVerify" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "offSiteSubscriberId" INTEGER NOT NULL,
    "verificationString" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OffSiteSubscriberToTwitterAccount" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "OffSiteSubscribersToVerify_offSiteSubscriberId_unique" ON "OffSiteSubscribersToVerify"("offSiteSubscriberId");

-- CreateIndex
CREATE UNIQUE INDEX "_OffSiteSubscriberToTwitterAccount_AB_unique" ON "_OffSiteSubscriberToTwitterAccount"("A", "B");

-- CreateIndex
CREATE INDEX "_OffSiteSubscriberToTwitterAccount_B_index" ON "_OffSiteSubscriberToTwitterAccount"("B");

-- AddForeignKey
ALTER TABLE "OffSiteSubscribersToVerify" ADD FOREIGN KEY ("offSiteSubscriberId") REFERENCES "OffSiteSubscriber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OffSiteSubscriberToTwitterAccount" ADD FOREIGN KEY ("A") REFERENCES "OffSiteSubscriber"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OffSiteSubscriberToTwitterAccount" ADD FOREIGN KEY ("B") REFERENCES "TwitterAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
