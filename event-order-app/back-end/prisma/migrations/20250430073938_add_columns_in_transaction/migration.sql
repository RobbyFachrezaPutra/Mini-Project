/*
  Warnings:

  - Added the required column `coupon_id` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount_amount` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `final_price` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `point_amount` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voucher_id` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "coupon_id" INTEGER NOT NULL,
ADD COLUMN     "discount_amount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "final_price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "point_amount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "voucher_id" INTEGER NOT NULL;
