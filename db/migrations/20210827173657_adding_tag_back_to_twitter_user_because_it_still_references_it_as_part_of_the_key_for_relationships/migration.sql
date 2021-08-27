-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "twitterUserTwitterId" TEXT;

-- AddForeignKey
ALTER TABLE "Tag" ADD FOREIGN KEY ("twitterUserTwitterId") REFERENCES "TwitterUser"("twitterId") ON DELETE SET NULL ON UPDATE CASCADE;
