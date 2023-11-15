/*
  Warnings:

  - You are about to drop the `Plant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Plant";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rent_area" (
    "id" TEXT NOT NULL,
    "area" TEXT NOT NULL,

    CONSTRAINT "Rent_area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rent_post" (
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
    "rent_areaId" TEXT NOT NULL,

    CONSTRAINT "Rent_post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_email_key" ON "User"("username", "email");

-- AddForeignKey
ALTER TABLE "Rent_post" ADD CONSTRAINT "Rent_post_rent_areaId_fkey" FOREIGN KEY ("rent_areaId") REFERENCES "Rent_area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent_post" ADD CONSTRAINT "Rent_post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
