-- DropForeignKey
ALTER TABLE "RelationshipStaging" DROP CONSTRAINT "RelationshipStaging_twitterAccountId_fkey";

-- AddForeignKey
ALTER TABLE "RelationshipStaging" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
