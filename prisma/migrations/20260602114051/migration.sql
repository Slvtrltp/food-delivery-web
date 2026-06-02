/*
  Warnings:

  - You are about to drop the column `foodNAme` on the `Food` table. All the data in the column will be lost.
  - Added the required column `foodName` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" DROP COLUMN "foodNAme",
ADD COLUMN     "foodName" TEXT NOT NULL;
