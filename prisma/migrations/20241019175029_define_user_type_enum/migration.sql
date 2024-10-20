/*
  Warnings:

  - The values [MALE,FEMALE,OTHER] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - The `user_type` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('SuperUser', 'Manager', 'Premium', 'Standard', 'Anonymous');

-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('Male', 'Female', 'Other');
ALTER TABLE "User" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_type",
ADD COLUMN     "user_type" "UserType";
