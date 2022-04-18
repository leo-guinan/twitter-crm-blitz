-- CreateTable
CREATE TABLE "BoostRequestRecord" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorUsername" TEXT NOT NULL,
    "tweetMessage" TEXT NOT NULL,
    "engagementScore" INTEGER NOT NULL,
    "boostedTweetId" TEXT NOT NULL,
    "boostedTweetAuthorId" INTEGER NOT NULL,
    "requestorTwitterAccountId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BoostRequestRecord" ADD FOREIGN KEY ("boostedTweetId") REFERENCES "Tweet"("tweetId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoostRequestRecord" ADD FOREIGN KEY ("boostedTweetAuthorId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoostRequestRecord" ADD FOREIGN KEY ("requestorTwitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
