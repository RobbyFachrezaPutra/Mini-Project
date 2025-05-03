/*
  Warnings:

  - You are about to drop the column `source` on the `points` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `points` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `points` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "points" DROP COLUMN "source",
DROP COLUMN "type";

-- CreateIndex
CREATE UNIQUE INDEX "points_user_id_key" ON "points"("user_id");
