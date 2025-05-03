import { ITransactionParam } from "../interface/transaction.interface";
import prisma from "../lib/prisma";

async function CreateTransactionService(param : ITransactionParam){
  
  try {

    const result = await prisma.$transaction(async (prisma) => {

      const transaction = await prisma.transaction.create({
        data: {
          event_id      : param.event_id,
          ticket_id     : param.ticket_id,
          voucher_id    : param.voucher_id,
          coupon_id     : param.coupon_id,
          qty           : param.qty,
          price         : param.price,
          total_price   : param.total_price,
          voucher_amount: param.voucher_amount,
          point_amount  : param.point_amount,
          coupon_amount : param.coupon_amount,
          final_price   : param.final_price,
          payment_proof : param.payment_proof,
          status        : param.status,
          created_at    : new Date(),
          updated_at    : new Date(),
          user_id       : param.user_id
        },
      });

      if (param.coupon_id) {
        await prisma.coupon_Usage.create({
          data: {
            coupon_id      : param.coupon_id,
            user_id        : param.user_id,
            transaction_id : transaction.id,
            assigned_at : new Date(),
            used_at : new Date()
          },
        });
      }

      if (param.point_amount) {
        await prisma.point.update({
          where: { user_id : param.user_id },
          data: {
            point: {
              decrement: param.point_amount,
            },
          },
        });
      }

      if (param.event_id) {
        await prisma.event.update({
          where: { id : param.event_id },
          data: {
            available_seats : {
              decrement: param.qty,
            },
          },
        });
      }

      if (param.ticket_id) {
        await prisma.ticket.update({
          where: { id : param.ticket_id },
          data: {
            remaining : {
              decrement: param.qty,
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
          ticket_id     : param.ticket_id,
          voucher_id    : param.voucher_id,
          coupon_id     : param.coupon_id,
          qty           : param.qty,
          price         : param.price,
          total_price   : param.total_price,
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
        await prisma.point.update({
          where: { user_id : param.user_id },
          data: {
            point: {
              increment: param.point_amount,
            },
          },
        });
      }

      if (param.event_id && (param.status === "expired" || param.status === "cancel")) {
        await prisma.event.update({
          where: { id : param.event_id },
          data: {
            available_seats : {
              increment: param.qty,
            },
          },
        });
      }

      if (param.ticket_id && (param.status === "expired" || param.status === "cancel")) {
        await prisma.ticket.update({
          where: { id : param.ticket_id },
          data: {
            remaining : {
              increment: param.qty,
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

export { CreateTransactionService, GetTransactionService, GetAllTransactionService, UpdateTransactionService }