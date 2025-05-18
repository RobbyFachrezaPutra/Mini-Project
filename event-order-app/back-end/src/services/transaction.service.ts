import { date } from "zod";
import ITransactionParam from "../interface/transaction.interface";
import prisma from "../lib/prisma";
import { uploadImageToCloudinary } from "../utils/cloudinary";
import { Prisma } from "@prisma/client";
import { connect } from "http2";
import { sendMailEthereal } from "../utils/sendMailEtheral";

async function CreateTransactionService(param: ITransactionParam) {
  try {

    const result = await prisma.$transaction(async (tx) => {

      const details = param.details.map((detail) => ({
        ...detail,
        subtotal: detail.price * detail.qty,
      }));
      const subtotal = details.reduce((acc, detail) => acc + detail.subtotal, 0);
      // Hitung final_price
      const voucherAmount = param.voucher_amount || 0;
      const couponAmount = param.coupon_amount || 0;
      const finalCouponAmount = (couponAmount * subtotal) / 100;
      const pointAmount = param.point_amount || 0;
      const finalPrice = subtotal - voucherAmount - finalCouponAmount - pointAmount;

      const data: any = {
        code: param.code,
        voucher_amount: param.voucher_amount,
        point_amount: param.point_amount,
        coupon_amount: param.coupon_amount,
        final_price: finalPrice,
        payment_proof: param.payment_proof,
        status: param.status,
        created_at: new Date(),
        updated_at: new Date(),
        user: {
          connect: { id: param.user_id },
        },
        event: {
          connect: { id: param.event_id },
        },
      };

      // Conditionally add voucher relation
      if (param.voucher_id) {
        data.voucher = {
          connect: { id: param.voucher_id },
        };
      }

      // Conditionally add coupon relation
      if (param.coupon_id) {
        data.coupon = {
          connect: { id: param.coupon_id },
        };
      }

      const transaction = await prisma.transaction.create({
        data,
      });

      // Simpan detail tiket
      await tx.transactionDetail.createMany({
        data: param.details.map((detail) => ({
          transaction_id: transaction.id,
          ticket_id: detail.ticket_id,
          qty: detail.qty,
          price: detail.price,
          subtotal: detail.price * detail.qty,
        })),
      });

      // Update kupon
      if (param.coupon_id) {
        await tx.coupon_Usage.create({
          data: {
            coupon_id: param.coupon_id,
            user_id: param.user_id,
            transaction_id: transaction.id,
            assigned_at: new Date(),
            used_at: new Date(),
          },
        });
      }

      // Update point user
      if (param.point_amount) {
        deductPoints(param.user_id, transaction.id, param.point_amount);
      }

      // Update tiket dan event
      for (const detail of param.details) {
        await tx.ticket.update({
          where: { id: detail.ticket_id },
          data: {
            remaining: {
              decrement: detail.qty,
            },
          },
        });

        await tx.event.update({
          where: { id: param.event_id },
          data: {
            available_seats: {
              decrement: detail.qty,
            },
          },
        });
      }

      return transaction;
    });

    return result;
  } catch (err) {
    throw err;
  }
}

async function deductPoints(
  user_id: number,
  transaction_id: number,
  pointUsed: number
) {
  const availablePoints = await prisma.point.findMany({
    where: {
      user_id: user_id,
      expired_at: {
        gte: new Date(), // yang belum expired pada saat transaksi
      },
    },
    orderBy: {
      expired_at: "asc", // FIFO: pakai yang paling cepet expired
    },
  });

  let remaining = pointUsed;

  for (const pointRow of availablePoints) {
    if (remaining <= 0) break;

    const usable = Math.min(remaining, pointRow.point);

    await prisma.point_Usage.create({
      data: {
        transaction_id: transaction_id,
        point_id: pointRow.id,
        used: usable,
        usedAt: new Date(),
      },
    });

    await prisma.point.update({
      where: {
        id: pointRow.id,
        user_id: user_id,
      },
      data: {
        point: {
          decrement: usable,
        },
      },
    });

    remaining -= usable;
  }
}

async function GetAllTransactionService() {
  try {
    const transaction = await prisma.transaction.findMany({});

    return transaction;
  } catch (err) {
    throw err;
  }
}

async function GetTransactionService(id: number) {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    return transaction;
  } catch (err) {
    throw err;
  }
}

async function UpdateTransactionService(id: number, param: ITransactionParam) {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const transaction = await prisma.transaction.update({
        where: { id },
        data: {
          event_id: param.event_id,
          voucher_id: param.voucher_id,
          coupon_id: param.coupon_id,
          voucher_amount: param.voucher_amount,
          point_amount: param.point_amount,
          coupon_amount: param.coupon_amount,
          final_price: param.final_price,
          payment_proof: param.payment_proof,
          status: param.status,
          updated_at: new Date(),
        },
      });

      if (
        param.coupon_id &&
        (param.status === "expired" || param.status === "cancel" || param.status === "rejected")
      ) {
        await prisma.coupon_Usage.delete({
          where: {
            coupon_id: param.coupon_id,
            user_id: param.user_id,
            transaction_id: transaction.id,
          },
        });
      }

      if (
        param.point_amount &&
        (param.status === "expired" || param.status === "cancel" || param.status === "rejected")
      ) {
        const point_usages = await prisma.point_Usage.findMany({
          where: {
            transaction_id: transaction.id,
          },
        });

        for (const point_usage of point_usages) {
          await prisma.point.update({
            where: {
              id: point_usage.id,
            },
            data: {
              point: {
                increment: point_usage.used,
              },
            },
          });
        }
      }

      for (const detail of param.details) {
        if (
          param.event_id &&
          (param.status === "expired" || param.status === "cancel" || param.status === "rejected")
        ) {
          await prisma.ticket.update({
            where: { id: detail.ticket_id },
            data: {
              remaining: {
                decrement: detail.qty,
              },
            },
          });
        }

        if (
          detail.ticket_id &&
          (param.status === "expired" || param.status === "cancel" || param.status === "rejected")
        ) {
          await prisma.event.update({
            where: { id: param.event_id },
            data: {
              available_seats: {
                decrement: detail.qty,
              },
            },
          });
        }
      }

      return transaction;
    });

    return result;
  } catch (err) {
    throw err;
  }
}

async function UploadPaymentProofService(
  param: ITransactionParam,
  id: number,
  file?: Express.Multer.File
) {
  if (file) {
    const uploadResult = await uploadImageToCloudinary(file);
    param.payment_proof = uploadResult?.secure_url;
  }
  const result = await prisma.$transaction(async (prisma) => {
    const transaction = await prisma.transaction.update({
      where: { id },
      data: {
        payment_proof: param.payment_proof,
        status: "pending",
      },
    });
  });
}

async function GetTransactionByUserIdService(user_id: number) {
  try {
    const transaction = await prisma.transaction.findMany({
      where: { user_id },
      include: {
        event: true,
      },
    });

    return transaction;
  } catch (err) {
    throw err;
  }
}

async function UpdateTransactionTransIdService(
  id: number,
  param: ITransactionParam
) {
  try {
    const transaction = await prisma.transaction.update({
      where: { id },
      data: {
        status: "approve",
      },
      include: {
        user: true,
      },
    });

    if (transaction.user && transaction.user.email) {
      const subject = "Transaksi Anda Diterima";
      const html = `<p>Halo ${transaction.user.first_name || ""},<br>
        Transaksi Anda dengan Code <b>${
          transaction.code
        }</b> telah <b>di-approve</b>.<br>
        Terima kasih telah menggunakan layanan kami!</p>`;

      // Kirim email (Ethereal)
      const previewUrl = await sendMailEthereal(
        transaction.user.email,
        subject,
        html
      );
      console.log("Preview Email URL:", previewUrl); // Bisa dicek di console
    }

    return transaction;
  } catch (err) {
    throw err;
  }
}

async function GetTransactionByOrganizerIdService(organizerId: number) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        event: {
          organizer_id: organizerId, // Filter transaksi berdasarkan event yang dimiliki oleh organizer
        },
      },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        event: {
          select: {
            name: true,
          },
        },
        detail: {
          select: {
            qty: true,
            ticket: {
              select: {
                type: true,
              },
            },
          },
        },
      },
    });

    // Jika transaksi ditemukan, format data transaksi
    const formattedTransactions = transactions.map((tx) => {
      // Menangani jika detail lebih dari satu, dan menggabungkan data detailnya
      const totalQuantity = tx.detail.reduce(
        (acc, detail) => acc + detail.qty,
        0
      );
      const ticketType = tx.detail[0]?.ticket.type || "-"; // Ambil tipe tiket dari detail pertama

      return {
        id: tx.id,
        name: `${tx.user?.first_name} ${tx.user?.last_name}`,
        email: tx.user?.email,
        event: tx.event?.name,
        ticketType,
        quantity: totalQuantity,
        paymentProof: tx.payment_proof,
        status: tx.status,
        createdAt: new Date(tx.created_at).toISOString(), // Format tanggal
      };
    });

    return formattedTransactions;
  } catch (err) {
    console.error("Error fetching transactions: ", err);
    throw new Error("Failed to fetch transactions");
  }
}

async function UpdateTransactionRejectService(id: number, param: ITransactionParam) {
  try {
    let transactionResult: any;

    // Step 1: Jalankan semua query DB dalam satu transaksi
    transactionResult = await prisma.$transaction(async (prisma) => {
      const transaction = await prisma.transaction.update({
        where: { id },
        data: {
          status: "rejected",
          updated_at: new Date(),
        },
        include: {
          user: true,
          voucher: true,
          coupon: true,
          detail: true,
          event: true,
        },
      });

      const updates: Promise<any>[] = [];

      // Hapus coupon usage jika ada
      if (
        transaction.coupon?.id &&
        ["expired", "cancel", "rejected"].includes(transaction.status)
      ) {
        updates.push(
          prisma.coupon_Usage.delete({
            where: {
              coupon_id: transaction.coupon.id,
              user_id: transaction.user?.id!,
              transaction_id: transaction.id,
            },
          })
        );
      }

      // Update point usage jika ada
      if (
        transaction.point_amount &&
        ["expired", "cancel", "rejected"].includes(transaction.status)
      ) {
        const point_usages = await prisma.point_Usage.findMany({
          where: { transaction_id: transaction.id },
        });

        for (const point_usage of point_usages) {
          updates.push(
            prisma.point.update({
              where: { id: point_usage.id },
              data: {
                point: { increment: point_usage.used },
              },
            })
          );
        }
      }

      // Update remaining ticket & available seats
      if (["expired", "cancel", "rejected"].includes(transaction.status)) {
        for (const detail of transaction.detail) {
          if (detail.ticket_id) {
            updates.push(
              prisma.ticket.update({
                where: { id: detail.ticket_id },
                data: {
                  remaining: { increment: detail.qty },
                },
              })
            );
          }

          if (transaction.event?.id) {
            updates.push(
              prisma.event.update({
                where: { id: transaction.event.id },
                data: {
                  available_seats: { increment: detail.qty },
                },
              })
            );
          }
        }
      }

      // Jalankan semua query paralel
      await Promise.all(updates);

      return transaction;
    });

    // Step 2: Kirim email di luar transaksi DB (lebih aman)
    if (transactionResult.user?.email) {
      const subject = "Transaksi Anda Ditolak";
      const html = `<p>Halo ${transactionResult.user.first_name || ""},<br>
        Transaksi Anda dengan Code <b>${transactionResult.code}</b> telah <b>ditolak</b>.<br>
        Terima kasih telah menggunakan layanan kami!</p>`;

      // Kirim email
      const previewUrl = await sendMailEthereal(
        transactionResult.user.email,
        subject,
        html
      );
      console.log("Preview Email URL:", previewUrl);
    }

    return transactionResult;
  } catch (err) {
    console.error("Error in UpdateTransactionRejectService:", err);
    throw err;
  }
}


export {
  CreateTransactionService,
  GetTransactionService,
  GetAllTransactionService,
  UpdateTransactionService,
  UploadPaymentProofService,
  GetTransactionByUserIdService,
  GetTransactionByOrganizerIdService,
  UpdateTransactionTransIdService,
  UpdateTransactionRejectService
};
