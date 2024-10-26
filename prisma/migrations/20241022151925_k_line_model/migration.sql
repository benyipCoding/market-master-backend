-- CreateTable
CREATE TABLE "KLine" (
    "id" BIGINT NOT NULL,
    "symbol" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "open" DECIMAL(65,30) NOT NULL,
    "high" DECIMAL(65,30) NOT NULL,
    "low" DECIMAL(65,30) NOT NULL,
    "close" DECIMAL(65,30) NOT NULL,
    "volume" INTEGER,

    CONSTRAINT "KLine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SymbolPeriodTimestampIndex" ON "KLine"("symbol", "period", "timestamp");

-- CreateIndex
CREATE INDEX "SymbolIndex" ON "KLine"("symbol");

-- CreateIndex
CREATE INDEX "TimestampIndex" ON "KLine"("timestamp");
