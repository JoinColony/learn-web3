-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Colony" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Mission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "colonyId" INTEGER NOT NULL,
    "bounty" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "worker" TEXT,
    "txHash" TEXT,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Mission_colonyId_fkey" FOREIGN KEY ("colonyId") REFERENCES "Colony" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "missionId" INTEGER NOT NULL,
    "whyme" TEXT NOT NULL,
    CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Application_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ColonyToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ColonyToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Colony" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ColonyToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "_ColonyToUser_AB_unique" ON "_ColonyToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ColonyToUser_B_index" ON "_ColonyToUser"("B");
