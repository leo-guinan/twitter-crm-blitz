-- AlterTable
ALTER TABLE "DirectMessage" ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Follower" ADD COLUMN     "status" TEXT;
