-- CreateTable
CREATE TABLE "CommunityFollower" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "communityId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommunityFollower.email_communityId_unique" ON "CommunityFollower"("email", "communityId");

-- AddForeignKey
ALTER TABLE "CommunityFollower" ADD FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
