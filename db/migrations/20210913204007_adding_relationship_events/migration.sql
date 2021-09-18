-- CreateEnum
CREATE TYPE "RelationshipEventType" AS ENUM ('DIRECT_MESSAGE_SENT', 'DIRECT_MESSAGE_RECEIVED', 'RELATIONSHIP_CREATED');

-- CreateTable
CREATE TABLE "RelationshipEvent" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "twitterUserId" TEXT NOT NULL,
    "twitterAccountId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RelationshipEvent" ADD FOREIGN KEY ("twitterUserId") REFERENCES "TwitterUser"("twitterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationshipEvent" ADD FOREIGN KEY ("twitterAccountId") REFERENCES "TwitterAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationshipEvent" ADD FOREIGN KEY ("twitterAccountId", "twitterUserId") REFERENCES "Relationship"("twitterAccountId", "twitterUserId") ON DELETE CASCADE ON UPDATE CASCADE;
