-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "authorAccountId" INTEGER;

-- CreateTable
CREATE TABLE "_likes" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_retweets" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_likes_AB_unique" ON "_likes"("A", "B");

-- CreateIndex
CREATE INDEX "_likes_B_index" ON "_likes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_retweets_AB_unique" ON "_retweets"("A", "B");

-- CreateIndex
CREATE INDEX "_retweets_B_index" ON "_retweets"("B");

-- AddForeignKey
ALTER TABLE "Tweet" ADD FOREIGN KEY ("authorAccountId") REFERENCES "TwitterAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likes" ADD FOREIGN KEY ("A") REFERENCES "Tweet"("tweetId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likes" ADD FOREIGN KEY ("B") REFERENCES "TwitterAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_retweets" ADD FOREIGN KEY ("A") REFERENCES "Tweet"("tweetId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_retweets" ADD FOREIGN KEY ("B") REFERENCES "TwitterAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
