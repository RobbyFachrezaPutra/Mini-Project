import { date } from "zod";
import  ITransactionParam from "../interface/transaction.interface";
import prisma from "../lib/prisma";
import { uploadImageToCloudinary } from "../utils/cloudinary";

async function CreateTransactionService(param: ITransactionParam) {
  try {
    const result = await prisma.$transaction(async (tx ) => {
      const transaction = await tx.transaction.create({
        data: {
          event_id: param.event_id,
          code : param.code,
          voucher_id: param.voucher_id,
          coupon_id: param.coupon_id,
          voucher_amount: param.voucher_amount,
          point_amount: param.point_amount,
          coupon_amount: param.coupon_amount,
          final_price: param.final_price,
          payment_proof: param.payment_proof,
          status: param.status,
          created_at: new Date(),
          updated_at: new Date(),
          user_id: param.user_id
        },
      });

      // Simpan detail tiket
      await tx.transactionDetail.createMany({ 
        data: param.details.map((detail) => ({
          transaction_id: transaction.id,
          ticket_id: detail.ticket_id,
          qty: detail.qty,
          price: detail.price,
          subtotal: detail.price * detail.qty
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
        deductPoints(param.user_id, transaction.id, param.point_amount)
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

async function deductPoints(user_id: number, transaction_id:number, pointUsed: number) {

  const availablePoints = await prisma.point.findMany({
    where: {
      user_id: user_id,
      expired_at: {
        gte: new Date(), // yang belum expired pada saat transaksi
      },
    },
    orderBy: {
      expired_at: 'asc', // FIFO: pakai yang paling cepet expired
    },
  });

  let remaining = pointUsed;

  for (const pointRow of availablePoints) {
    if (remaining <= 0) break;

    const usable = Math.min(remaining, pointRow.point);

    await prisma.point_Usage.create(
      {
        data:{
          transaction_id : transaction_id,
          point_id       : pointRow.id,
          used           : usable,
          usedAt         : new Date()      
        }
      }
    )

    await prisma.point.update({
      where: { 
        id: pointRow.id,
        user_id: user_id
       },
      data: {
        point: {
          decrement : usable
        }
      },
    });

    remaining -= usable;
  }
}

async function GetAllTransactionService(){
  
  try {
    const transaction = await prisma.transaction.findMany({
      },
    );

    return transaction;
  } catch (err) {
    throw err;
  }
}

async function GetTransactionService(id : number){
  
  try {
    const transaction = await prisma.transaction.findUnique({
      where : { id }
      },
    );

    return transaction;
  } catch (err) {
    throw err;
  }
}

async function UpdateTransactionService(id : number, param : ITransactionParam){
  
  try {

    const result = await prisma.$transaction(async (prisma) => {

      const transaction = await prisma.transaction.update({
        where : { id },
        data: {
          event_id      : param.event_id,
          voucher_id    : param.voucher_id,
          coupon_id     : param.coupon_id,
          voucher_amount: param.voucher_amount,
          point_amount  : param.point_amount,
          coupon_amount : param.coupon_amount,
          final_price   : param.final_price,
          payment_proof : param.payment_proof,
          status        : param.status,
          updated_at    : new Date(),
        },
      });

      if (param.coupon_id && (param.status === "expired" || param.status === "cancel")) {
        await prisma.coupon_Usage.delete({
          where : { 
            coupon_id : param.coupon_id,
            user_id        : param.user_id,
            transaction_id : transaction.id 
          }
        });
      }

      if (param.point_amount && (param.status === "expired" || param.status === "cancel")) {
        const point_usages = await prisma.point_Usage.findMany({
          where :{
            transaction_id : transaction.id
          }
        })

        for (const point_usage of point_usages){
          await prisma.point.update({
            where: {
              id : point_usage.id
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
        if (param.event_id && (param.status === "expired" || param.status === "cancel")) {
          await prisma.ticket.update({
            where: { id: detail.ticket_id },
            data: {
              remaining: {
                decrement: detail.qty,
              },
            },
          });
        }

        if (detail.ticket_id && (param.status === "expired" || param.status === "cancel")) {
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

async function UploadPaymentProofService(param : ITransactionParam,
  file?: Express.Multer.File)
  {
    if (file) {
      const uploadResult = await uploadImageToCloudinary(file);
      param.payment_proof = uploadResult?.secure_url;
    }
    const result = await prisma.$transaction(async (prisma) => {

      const transaction = await prisma.transaction.update({
        where : { id : param.id },
        data: {
          payment_proof : param.payment_proof,
          status        : "Waiting for confirmation",
        },
      })
    }
  )
}

async function GetTransactionByUserIdService(user_id : number){
  
  try {
    const transaction = await prisma.transaction.findMany({
      where : { user_id },
      include : {
        event : true
      }
      },
    );

    return transaction;
  } catch (err) {
    throw err;
  }
}

export { 
  CreateTransactionService, 
  GetTransactionService, 
  GetAllTransactionService, 
  UpdateTransactionService, 
  UploadPaymentProofService,
  GetTransactionByUserIdService
}