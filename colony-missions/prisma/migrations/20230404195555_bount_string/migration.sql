-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "colony" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bounty" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "worker" TEXT,
    "done" BOOLEAN NOT NULL
);
INSERT INTO "new_Mission" ("bounty", "colony", "description", "done", "id", "title", "worker") SELECT "bounty", "colony", "description", "done", "id", "title", "worker" FROM "Mission";
DROP TABLE "Mission";
ALTER TABLE "new_Mission" RENAME TO "Mission";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
