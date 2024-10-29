-- DropForeignKey
ALTER TABLE "KLine" DROP CONSTRAINT "KLine_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "KLine" DROP CONSTRAINT "KLine_period_id_fkey";

-- DropForeignKey
ALTER TABLE "KLine" DROP CONSTRAINT "KLine_symbol_id_fkey";

-- DropForeignKey
ALTER TABLE "Symbol" DROP CONSTRAINT "Symbol_category_id_fkey";

-- AddForeignKey
ALTER TABLE "KLine" ADD CONSTRAINT "KLine_symbol_id_fkey" FOREIGN KEY ("symbol_id") REFERENCES "Symbol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KLine" ADD CONSTRAINT "KLine_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "Period"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KLine" ADD CONSTRAINT "KLine_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Symbol" ADD CONSTRAINT "Symbol_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "SymbolCategory"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
