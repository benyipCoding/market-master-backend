-- AlterTable
ALTER TABLE "KLine" ALTER COLUMN "create_at" DROP DEFAULT,
ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMP(0);
