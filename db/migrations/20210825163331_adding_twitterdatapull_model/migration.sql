-- CreateTable
CREATE TABLE "TwitterDataPulls" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "relationshipType" "RelationshipType" NOT NULL,
    "paginationToken" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TwitterDataPulls" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
