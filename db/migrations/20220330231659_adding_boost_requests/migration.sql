-- CreateTable
CREATE TABLE "BoostRequest" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tweetId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmplifierInBoostRequest" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "boostRequestId" INTEGER NOT NULL,
    "amplifierId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BoostRequest" ADD FOREIGN KEY ("tweetId") REFERENCES "Tweet"("tweetId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmplifierInBoostRequest" ADD FOREIGN KEY ("boostRequestId") REFERENCES "BoostRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmplifierInBoostRequest" ADD FOREIGN KEY ("amplifierId") REFERENCES "Amplifier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
