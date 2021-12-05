-- AlterTable
ALTER TABLE "TwitterAccount" ADD COLUMN     "twitterAccountWaitlistId" INTEGER;

-- CreateTable
CREATE TABLE "TwitterAccountWaitList" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "twitterAccountId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TwitterAccountWaitList_twitterAccountId_unique" ON "TwitterAccountWaitList"("twitterAccountId");

-- AddForeignKey
ALTER TABLE "TwitterAccountWaitList" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
