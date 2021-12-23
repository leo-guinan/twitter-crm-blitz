-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_authorId_fkey";

-- AlterTable
ALTER TABLE "Tweet" ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Tweet" ADD FOREIGN KEY ("authorId") REFERENCES "TwitterUser"("twitterId") ON DELETE SET NULL ON UPDATE CASCADE;
