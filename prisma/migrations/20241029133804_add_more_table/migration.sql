/*
  Warnings:

  - You are about to drop the column `period` on the `KLine` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `KLine` table. All the data in the column will be lost.
  - You are about to drop the column `modifier_id` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `description` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[symbol_id,period_id,timestamp]` on the table `KLine` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creator_id` to the `KLine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period_id` to the `KLine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol_id` to the `KLine` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `timestamp` on the `KLine` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "SymbolIndex";

-- DropIndex
DROP INDEX "SymbolPeriodTimestampIndex";

-- AlterTable
ALTER TABLE "KLine" DROP COLUMN "period",
DROP COLUMN "symbol",
ADD COLUMN     "creator_id" TEXT NOT NULL,
ADD COLUMN     "period_id" INTEGER NOT NULL,
ADD COLUMN     "symbol_id" INTEGER NOT NULL,
DROP COLUMN "timestamp",
ADD COLUMN     "timestamp" TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "modifier_id",
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255);

-- CreateTable
CREATE TABLE "SymbolCategory" (
    "id" SERIAL NOT NULL,
    "name_zh" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,

    CONSTRAINT "SymbolCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Period" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Symbol" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "Symbol_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SymbolCategory_name_zh_key" ON "SymbolCategory"("name_zh");

-- CreateIndex
CREATE UNIQUE INDEX "SymbolCategory_name_en_key" ON "SymbolCategory"("name_en");

-- CreateIndex
CREATE UNIQUE INDEX "Period_label_key" ON "Period"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Symbol_label_key" ON "Symbol"("label");

-- CreateIndex
CREATE INDEX "SymbolPeriodTimestampIndex" ON "KLine"("symbol_id", "period_id", "timestamp");

-- CreateIndex
CREATE INDEX "SymbolIndex" ON "KLine"("symbol_id");

-- CreateIndex
CREATE INDEX "TimestampIndex" ON "KLine"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "KLine_symbol_id_period_id_timestamp_key" ON "KLine"("symbol_id", "period_id", "timestamp");

-- AddForeignKey
ALTER TABLE "KLine" ADD CONSTRAINT "KLine_symbol_id_fkey" FOREIGN KEY ("symbol_id") REFERENCES "Symbol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KLine" ADD CONSTRAINT "KLine_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KLine" ADD CONSTRAINT "KLine_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Symbol" ADD CONSTRAINT "Symbol_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "SymbolCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
