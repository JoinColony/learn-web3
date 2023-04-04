/*
  Warnings:

  - Added the required column `done` to the `Mission` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "colony" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bounty" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "worker" TEXT,
    "done" BOOLEAN NOT NULL
);
INSERT INTO "new_Mission" ("bounty", "colony", "description", "id", "title") SELECT "bounty", "colony", "description", "id", "title" FROM "Mission";
DROP TABLE "Mission";
ALTER TABLE "new_Mission" RENAME TO "Mission";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
