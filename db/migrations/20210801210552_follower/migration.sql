-- CreateTable
CREATE TABLE "Follower" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "bio" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
