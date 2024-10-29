/*
  Warnings:

  - You are about to alter the column `open` on the `KLine` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,10)`.
  - You are about to alter the column `high` on the `KLine` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,10)`.
  - You are about to alter the column `low` on the `KLine` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,10)`.
  - You are about to alter the column `close` on the `KLine` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,10)`.

*/
-- AlterTable
ALTER TABLE "KLine" ALTER COLUMN "open" SET DATA TYPE DECIMAL(10,10),
ALTER COLUMN "high" SET DATA TYPE DECIMAL(10,10),
ALTER COLUMN "low" SET DATA TYPE DECIMAL(10,10),
ALTER COLUMN "close" SET DATA TYPE DECIMAL(10,10);
