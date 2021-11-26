-- CreateTable
CREATE TABLE "_SubscriptionToTwitterUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SubscriptionToTwitterUser_AB_unique" ON "_SubscriptionToTwitterUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SubscriptionToTwitterUser_B_index" ON "_SubscriptionToTwitterUser"("B");

-- AddForeignKey
ALTER TABLE "_SubscriptionToTwitterUser" ADD FOREIGN KEY ("A") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubscriptionToTwitterUser" ADD FOREIGN KEY ("B") REFERENCES "TwitterUser"("twitterId") ON DELETE CASCADE ON UPDATE CASCADE;
