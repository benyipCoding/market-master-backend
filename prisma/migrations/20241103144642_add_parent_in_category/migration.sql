-- AlterTable
ALTER TABLE "SymbolCategory" ADD COLUMN     "parent_id" INTEGER;

-- AddForeignKey
ALTER TABLE "SymbolCategory" ADD CONSTRAINT "SymbolCategory_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "SymbolCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
