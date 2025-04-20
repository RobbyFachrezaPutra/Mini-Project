-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "role" VARCHAR(20) NOT NULL,
    "refferal_code" VARCHAR(20) NOT NULL,
    "profile_picture" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "organizer_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "location" VARCHAR(20) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "banner_url" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "quota" INTEGER NOT NULL,
    "remaining" INTEGER NOT NULL,
    "sales_start" TIMESTAMP(3) NOT NULL,
    "sales_end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "ticket_id" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "Price" DECIMAL(65,30) NOT NULL,
    "Total_Price" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,
    "payment_proof" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referral_logs" (
    "id" SERIAL NOT NULL,
    "referrer_id" INTEGER NOT NULL,
    "referred_user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Referral_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vouchers" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "discount_amount" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vouchers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupons" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "discount_amount" DECIMAL(65,30) NOT NULL,
    "max_usage" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupon_Usage" (
    "id" SERIAL NOT NULL,
    "coupon_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupon_Usage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Points" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "point" INTEGER NOT NULL,
    "source" TEXT NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "Transaction_Id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
