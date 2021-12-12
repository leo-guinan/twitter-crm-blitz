-- CreateEnum
CREATE TYPE "ConsentStatus" AS ENUM ('APPROVED', 'PROVISIONAL', 'DECLINED');

-- AlterTable
ALTER TABLE "TwitterAccount" ADD COLUMN     "consentStatus" "ConsentStatus" NOT NULL DEFAULT E'PROVISIONAL';

-- CreateTable
CREATE TABLE "TwitterAccountsInSubscriptions" (
    "twitterAccountId" INTEGER NOT NULL,
    "subscriptionId" INTEGER NOT NULL,
    "type" "SubscriptionType" NOT NULL,

    PRIMARY KEY ("twitterAccountId","subscriptionId","type")
);

-- AddForeignKey
ALTER TABLE "TwitterAccountsInSubscriptions" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwitterAccountsInSubscriptions" ADD FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
