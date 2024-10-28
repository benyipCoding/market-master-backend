/*
  Warnings:

  - Changed the type of `timestamp` on the `KLine` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "KLine" DROP COLUMN "timestamp",
ADD COLUMN     "timestamp" BIGINT NOT NULL;

-- CreateIndex
CREATE INDEX "SymbolPeriodTimestampIndex" ON "KLine"("symbol", "period", "timestamp");

-- CreateIndex
CREATE INDEX "TimestampIndex" ON "KLine"("timestamp");
