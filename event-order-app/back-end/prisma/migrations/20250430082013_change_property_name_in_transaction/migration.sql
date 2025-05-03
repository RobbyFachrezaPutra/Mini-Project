/*
  Warnings:

  - You are about to drop the column `discount_amount` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `coupon_amount` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voucher_amount` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "discount_amount",
ADD COLUMN     "coupon_amount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "voucher_amount" DECIMAL(65,30) NOT NULL;
