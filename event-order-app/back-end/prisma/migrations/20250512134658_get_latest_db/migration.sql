/*
  Warnings:

  - Added the required column `code` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "code" VARCHAR(20) NOT NULL;
