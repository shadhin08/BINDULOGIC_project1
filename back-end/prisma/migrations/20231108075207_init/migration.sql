/*
  Warnings:

  - You are about to drop the column `rentAreaId` on the `RentPost` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `RentPost` table. All the data in the column will be lost.
  - Added the required column `rentAreaName` to the `RentPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userUsername` to the `RentPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RentPost" DROP CONSTRAINT "RentPost_rentAreaId_fkey";

-- DropForeignKey
ALTER TABLE "RentPost" DROP CONSTRAINT "RentPost_userId_fkey";

-- AlterTable
ALTER TABLE "RentPost" DROP COLUMN "rentAreaId",
DROP COLUMN "userId",
ADD COLUMN     "rentAreaName" TEXT NOT NULL,
ADD COLUMN     "userUsername" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "RentPost" ADD CONSTRAINT "RentPost_userUsername_fkey" FOREIGN KEY ("userUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentPost" ADD CONSTRAINT "RentPost_rentAreaName_fkey" FOREIGN KEY ("rentAreaName") REFERENCES "RentArea"("area") ON DELETE RESTRICT ON UPDATE CASCADE;
