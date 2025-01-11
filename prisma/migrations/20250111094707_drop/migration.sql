/*
  Warnings:

  - You are about to drop the `_ProfileToSymbol` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProfileToSymbol" DROP CONSTRAINT "_ProfileToSymbol_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProfileToSymbol" DROP CONSTRAINT "_ProfileToSymbol_B_fkey";

-- DropTable
DROP TABLE "_ProfileToSymbol";
