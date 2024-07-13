/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `CartProduct` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `CartProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CartProduct_id_key" ON "CartProduct"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CartProduct_productId_key" ON "CartProduct"("productId");
