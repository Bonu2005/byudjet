/*
  Warnings:

  - The `image` column on the `Banner` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "image",
ADD COLUMN     "image" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "photo" TEXT[];
