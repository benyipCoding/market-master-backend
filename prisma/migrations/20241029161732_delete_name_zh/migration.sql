/*
  Warnings:

  - You are about to drop the column `name_en` on the `SymbolCategory` table. All the data in the column will be lost.
  - You are about to drop the column `name_zh` on the `SymbolCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `SymbolCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `SymbolCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SymbolCategory_name_en_key";

-- DropIndex
DROP INDEX "SymbolCategory_name_zh_key";

-- AlterTable
ALTER TABLE "SymbolCategory" DROP COLUMN "name_en",
DROP COLUMN "name_zh",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SymbolCategory_name_key" ON "SymbolCategory"("name");
