/*
  Warnings:

  - You are about to drop the `Rent_area` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rent_post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rent_post" DROP CONSTRAINT "Rent_post_rent_areaId_fkey";

-- DropForeignKey
ALTER TABLE "Rent_post" DROP CONSTRAINT "Rent_post_userId_fkey";

-- DropTable
DROP TABLE "Rent_area";

-- DropTable
DROP TABLE "Rent_post";

-- CreateTable
CREATE TABLE "RentArea" (
    "id" TEXT NOT NULL,
    "area" TEXT NOT NULL,

    CONSTRAINT "RentArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentPost" (
    "id" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rent" INTEGER NOT NULL,
    "bed" INTEGER NOT NULL,
    "bath" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "rentAreaId" TEXT NOT NULL,

    CONSTRAINT "RentPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RentPost" ADD CONSTRAINT "RentPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentPost" ADD CONSTRAINT "RentPost_rentAreaId_fkey" FOREIGN KEY ("rentAreaId") REFERENCES "RentArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
