-- AlterTable
ALTER TABLE "User" ADD COLUMN     "login_error_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "user_type" TEXT,
ALTER COLUMN "gender" DROP NOT NULL;
