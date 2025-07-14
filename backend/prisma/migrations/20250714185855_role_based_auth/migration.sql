/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Blogs" DROP CONSTRAINT "Blogs_createrid_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE "Admin";

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_createrid_fkey" FOREIGN KEY ("createrid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
