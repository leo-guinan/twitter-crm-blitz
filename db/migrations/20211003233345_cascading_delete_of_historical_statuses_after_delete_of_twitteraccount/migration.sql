-- DropForeignKey
ALTER TABLE "TwitterAccountStatusHistorical" DROP CONSTRAINT "TwitterAccountStatusHistorical_twitterAccountId_fkey";

-- AddForeignKey
ALTER TABLE "TwitterAccountStatusHistorical" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
