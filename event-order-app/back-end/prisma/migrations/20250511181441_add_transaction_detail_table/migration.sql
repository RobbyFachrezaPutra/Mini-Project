/*
  Warnings:

  - You are about to drop the column `price` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `qty` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_ticket_id_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "price",
DROP COLUMN "qty",
DROP COLUMN "ticket_id",
DROP COLUMN "total_price";

-- CreateTable
CREATE TABLE "transactions_details" (
    "id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "ticket_id" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "subtotal" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "transactions_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactions_details" ADD CONSTRAINT "transactions_details_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions_details" ADD CONSTRAINT "transactions_details_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
