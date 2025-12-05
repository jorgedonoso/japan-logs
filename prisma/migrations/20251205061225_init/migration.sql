/*
  Warnings:

  - You are about to drop the column `title` on the `Location` table. All the data in the column will be lost.
  - Added the required column `name` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Location" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "prefectureId" INTEGER NOT NULL,
    CONSTRAINT "Location_prefectureId_fkey" FOREIGN KEY ("prefectureId") REFERENCES "Prefecture" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Location" ("id", "prefectureId") SELECT "id", "prefectureId" FROM "Location";
DROP TABLE "Location";
ALTER TABLE "new_Location" RENAME TO "Location";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
