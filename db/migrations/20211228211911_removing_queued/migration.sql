/*
  Warnings:

  - The values [QUEUED] on the enum `TweetLookupStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TweetLookupStatus_new" AS ENUM ('PROCESSING', 'COMPLETE', 'ERROR');
ALTER TABLE "TweetLookupReport" ALTER COLUMN "tweetLookupStatus" TYPE "TweetLookupStatus_new" USING ("tweetLookupStatus"::text::"TweetLookupStatus_new");
ALTER TYPE "TweetLookupStatus" RENAME TO "TweetLookupStatus_old";
ALTER TYPE "TweetLookupStatus_new" RENAME TO "TweetLookupStatus";
DROP TYPE "TweetLookupStatus_old";
COMMIT;
