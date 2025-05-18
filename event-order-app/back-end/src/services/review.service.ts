import prisma from "../lib/prisma";
import { IReview } from "../interface/review.interface";

async function CreateReviewService(param: IReview) {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: param.transaction_id },
    });

    if (!transaction || transaction.status !== "approve") {
      throw new Error("Transaksi tidak ditemukan atau belum disetujui.");
    }

    const existing = await prisma.review.findFirst({
      where: { transaction_id: param.transaction_id },
    });

    if (existing) {
      throw new Error("Review untuk transaksi ini sudah ada.");
    }

    const review = await prisma.review.create({
      data: {
        transaction_id: param.transaction_id,
        rating: param.rating,
        comment: param.comment,
        created_at: new Date(),
      },
    });

    return review;
  } catch (err) {
    throw err;
  }
}

async function GetReviewByTransactionId(transaction_id: number) {
  try {
    const review = await prisma.review.findFirst({
      where: { transaction_id },
    });

    return review;
  } catch (err) {
    throw err;
  }
}

export { CreateReviewService, GetReviewByTransactionId };
