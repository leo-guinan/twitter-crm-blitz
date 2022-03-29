/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,amplifiedAccountId]` on the table `Amplifier` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Amplifier.ownerId_amplifiedAccountId_unique" ON "Amplifier"("ownerId", "amplifiedAccountId");
