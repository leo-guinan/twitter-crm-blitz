/*
  Warnings:

  - The primary key for the `Relationship` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `userId` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Relationship" DROP CONSTRAINT "Relationship_pkey",
ADD PRIMARY KEY ("userId", "twitterUserId", "type");

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Tag" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
