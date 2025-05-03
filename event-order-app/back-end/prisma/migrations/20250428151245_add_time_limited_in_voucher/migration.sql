/*
  Warnings:

  - Added the required column `sales_end` to the `vouchers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales_start` to the `vouchers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vouchers" ADD COLUMN     "sales_end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sales_start" TIMESTAMP(3) NOT NULL;
