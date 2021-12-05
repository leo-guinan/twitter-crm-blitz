-- DropForeignKey
ALTER TABLE "Relationship" DROP CONSTRAINT "Relationship_twitterAccountId_fkey";

-- AddForeignKey
ALTER TABLE "Relationship" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
