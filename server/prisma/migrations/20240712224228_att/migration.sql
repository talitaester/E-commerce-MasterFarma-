/*
  Warnings:

  - Added the required column `quant` to the `CartProduct` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CartProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,
    "quant" INTEGER NOT NULL,
    CONSTRAINT "CartProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CartProduct_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CartProduct" ("cartId", "id", "productId") SELECT "cartId", "id", "productId" FROM "CartProduct";
DROP TABLE "CartProduct";
ALTER TABLE "new_CartProduct" RENAME TO "CartProduct";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
