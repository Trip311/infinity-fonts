/*
  Warnings:

  - You are about to drop the column `stroke` on the `Font` table. All the data in the column will be lost.
  - Added the required column `catagory` to the `Font` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Font" DROP COLUMN "stroke",
ADD COLUMN     "catagory" TEXT NOT NULL;
