/*
  Warnings:

  - You are about to drop the column `refferal_code` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "refferal_code",
ADD COLUMN     "referral_code" VARCHAR(20);
