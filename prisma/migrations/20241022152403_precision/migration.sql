/*
  Warnings:

  - Added the required column `precision` to the `KLine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KLine" ADD COLUMN     "precision" INTEGER NOT NULL;
