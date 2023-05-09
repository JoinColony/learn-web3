/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `Colony` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Colony_address_key" ON "Colony"("address");
