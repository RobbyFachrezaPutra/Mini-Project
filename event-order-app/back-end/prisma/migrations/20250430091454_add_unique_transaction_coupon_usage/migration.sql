/*
  Warnings:

  - A unique constraint covering the columns `[transaction_id]` on the table `coupon_usages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "coupon_usages_transaction_id_key" ON "coupon_usages"("transaction_id");

-- AddForeignKey
ALTER TABLE "coupon_usages" ADD CONSTRAINT "coupon_usages_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
