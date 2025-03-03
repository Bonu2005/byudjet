/*
  Warnings:

  - Added the required column `summa` to the `TransAction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransAction" ADD COLUMN     "summa" DOUBLE PRECISION NOT NULL;
