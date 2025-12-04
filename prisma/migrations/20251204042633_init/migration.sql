/*
  Warnings:

  - You are about to drop the `Prefectures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Prefectures";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Region" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Prefecture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,
    CONSTRAINT "Prefecture_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");
