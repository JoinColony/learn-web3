/*
  Warnings:

  - You are about to drop the column `done` on the `Mission` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "colony" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bounty" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "worker" TEXT,
    "txHash" TEXT,
    "paid" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Mission" ("bounty", "colony", "description", "id", "title", "worker") SELECT "bounty", "colony", "description", "id", "title", "worker" FROM "Mission";
DROP TABLE "Mission";
ALTER TABLE "new_Mission" RENAME TO "Mission";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
