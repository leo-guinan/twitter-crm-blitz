-- CreateEnum
CREATE TYPE "TwitterAccountRefreshReportStatus" AS ENUM ('QUEUED', 'PROCESSING', 'COMPLETE', 'ERROR');

-- CreateEnum
CREATE TYPE "TweetLookupStatus" AS ENUM ('QUEUED', 'PROCESSING', 'COMPLETE', 'ERROR');

-- CreateTable
CREATE TABLE "DailyRefreshReport" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwitterAccountRefreshReport" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "twitterAccountId" INTEGER NOT NULL,
    "status" "TwitterAccountRefreshReportStatus" NOT NULL,
    "containingDailyReportId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TweetLookupReport" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tweetLookedUpId" TEXT NOT NULL,
    "tweetLookupStatus" "TweetLookupStatus" NOT NULL,
    "containingTwitterAccountRefreshReportId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TwitterAccountRefreshReport" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwitterAccountRefreshReport" ADD FOREIGN KEY ("containingDailyReportId") REFERENCES "DailyRefreshReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TweetLookupReport" ADD FOREIGN KEY ("tweetLookedUpId") REFERENCES "Tweet"("tweetId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TweetLookupReport" ADD FOREIGN KEY ("containingTwitterAccountRefreshReportId") REFERENCES "TwitterAccountRefreshReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;
