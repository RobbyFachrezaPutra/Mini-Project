/*
  Warnings:

  - You are about to drop the column `coupon_expired` on the `coupons` table. All the data in the column will be lost.
  - Added the required column `expired_at` to the `coupons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coupons" DROP COLUMN "coupon_expired",
ADD COLUMN     "expired_at" TIMESTAMP(3) NOT NULL;
