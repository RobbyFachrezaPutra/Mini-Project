/*
  Warnings:

  - Added the required column `coupon_expired` to the `coupons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coupons" ADD COLUMN     "coupon_expired" TIMESTAMP(3) NOT NULL;
