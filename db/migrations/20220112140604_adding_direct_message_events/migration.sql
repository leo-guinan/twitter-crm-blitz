-- CreateTable
CREATE TABLE "DirectMessageEvent" (
    "twitterDMId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sendingAccountId" INTEGER NOT NULL,
    "receivingAccountId" INTEGER NOT NULL,
    "messageTimestamp" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("twitterDMId")
);

-- AddForeignKey
ALTER TABLE "DirectMessageEvent" ADD FOREIGN KEY ("sendingAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessageEvent" ADD FOREIGN KEY ("receivingAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
