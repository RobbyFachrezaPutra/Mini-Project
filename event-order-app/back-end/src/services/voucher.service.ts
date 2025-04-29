import { IVoucherParam } from "../interface/voucher.interface";
import prisma from "../lib/prisma";

async function CreateVoucherService(param : IVoucherParam){
  
  try {

    const result = await prisma.$transaction(async (prisma) => {

      const Voucher = await prisma.voucher.create({
        data: {
          code            : param.code,
          description     : param.description,
          event_id        : param.event_id,
          discount_amount : param.discount_amount,
          sales_start     : param.sales_start,
          sales_end       : param.sales_end,
          created_at      : new Date(),
          updated_at      : new Date(),
          created_by_id   : param.created_by_id
        },
      });

      return Voucher;
    });

    return result;
  } catch (err) {
    throw err;
  }
}

async function GetAllVoucherService(){
  
  try {
    const Voucher = await prisma.voucher.findMany({
      },
    );

    return Voucher;
  } catch (err) {
    throw err;
  }
}

async function GetVoucherService(id : number){
  
  try {
    const Voucher = await prisma.voucher.findUnique({
      where : { id }
      },
    );

    return Voucher;
  } catch (err) {
    throw err;
  }
}

async function UpdateVoucherService(id : number, param : IVoucherParam){
  
  try {

    const result = await prisma.$transaction(async (prisma) => {

      const Voucher = await prisma.voucher.update({
        where : { id },
        data: {
          code            : param.code,
          description     : param.description,
          event_id        : param.event_id,
          discount_amount : param.discount_amount,
          sales_start     : param.sales_start,
          sales_end       : param.sales_end,
          updated_at      : new Date()
        },
      });

      return Voucher;
    });

    return result;
  } catch (err) {
    throw err;
  }
}

async function DeleteVoucherService(id : number){
  
  try {

    const result = await prisma.$transaction(async (prisma) => {

      const user = await prisma.voucher.delete({
        where : { id }
      });

      return user;
    });
    return result;
  } catch (err) {
    throw err;
  }
}

export { CreateVoucherService, GetVoucherService, GetAllVoucherService, UpdateVoucherService, DeleteVoucherService }