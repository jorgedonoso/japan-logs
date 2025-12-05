-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "prefectureId" INTEGER NOT NULL,
    CONSTRAINT "Location_prefectureId_fkey" FOREIGN KEY ("prefectureId") REFERENCES "Prefecture" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
