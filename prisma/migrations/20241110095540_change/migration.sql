/*
  Warnings:

  - You are about to drop the column `minMove` on the `SymbolCategory` table. All the data in the column will be lost.
  - You are about to drop the column `precision` on the `SymbolCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Symbol" ADD COLUMN     "minMove" DOUBLE PRECISION,
ADD COLUMN     "precision" INTEGER;

-- AlterTable
ALTER TABLE "SymbolCategory" DROP COLUMN "minMove",
DROP COLUMN "precision";
