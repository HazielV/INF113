/*
  Warnings:

  - A unique constraint covering the columns `[tareaId]` on the table `Entrega` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Entrega_tareaId_key" ON "Entrega"("tareaId");
