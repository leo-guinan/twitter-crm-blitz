-- DropForeignKey
ALTER TABLE "Trial" DROP CONSTRAINT "Trial_organizationId_fkey";

-- AddForeignKey
ALTER TABLE "Trial" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
