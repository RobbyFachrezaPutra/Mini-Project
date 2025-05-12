-- CreateTable
CREATE TABLE "points_usage" (
    "id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "point_id" INTEGER NOT NULL,
    "used" INTEGER NOT NULL,
    "usedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "points_usage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "points_usage" ADD CONSTRAINT "points_usage_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "points_usage" ADD CONSTRAINT "points_usage_point_id_fkey" FOREIGN KEY ("point_id") REFERENCES "points"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
