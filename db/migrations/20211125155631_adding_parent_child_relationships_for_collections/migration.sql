-- AlterTable
ALTER TABLE "TweetCollection" ADD COLUMN     "parentCollectionId" INTEGER;

-- AddForeignKey
ALTER TABLE "TweetCollection" ADD FOREIGN KEY ("parentCollectionId") REFERENCES "TweetCollection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
