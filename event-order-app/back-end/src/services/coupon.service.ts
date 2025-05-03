import { ICoupon } from "../interface/coupon.interface";
import prisma from "../lib/prisma";

async function CreateCouponService(param: ICoupon) {
  const expiredAt = new Date(new Date().setMonth(new Date().getMonth() + 3));
  try {

    const result = await prisma.$transaction(async (prisma) => {
      const coupon = await prisma.coupon.create({
        data: {
          code: param.code,
          discount_amount: param.discount_amount,
          max_usage: param.max_usage,
          is_active: param.is_active,
          created_by_id: param.created_by_id,
          created_at: new Date(),
          updated_at: new Date(),
          expired_at: expiredAt
        },
      });
      return coupon;
    });

    return result;
  } catch (err) {
    throw err;
  }
}

async function GetAllCouponService() {
  try {
    const coupon = await prisma.coupon.findMany({
    });
    return coupon;
  } catch (err) {
    throw err;
  }
}

async function GetCouponService(id : number) {
  try {
    const coupon = await prisma.coupon.findUnique({
      where : { id }
    },
  );
    return coupon;
  } catch (err) {
    throw err;
  }
}

async function UpdateCouponService(id : number, param : ICoupon) {
  try {

    const result = await prisma.$transaction(async (prisma) => {
      const coupon = await prisma.coupon.update({
        where : { id },
        data: {
          code: param.code,
          discount_amount: param.discount_amount,
          max_usage: param.max_usage,
          is_active: param.is_active,
          created_by_id: param.created_by_id,
          created_at: new Date(),
          updated_at: new Date()
        },
      });
      return coupon;
    });

    return result;
  } catch (err) {
    throw err;
  }
}

async function DeleteCouponService(id : number) {
  try {
    
    const result = await prisma.$transaction(async (prisma) => {
      const coupon = await prisma.coupon.delete({
        where : { id }
      });
      return coupon;
    });

  } catch (err) {
    throw err;
  }
}

export { CreateCouponService, GetAllCouponService, GetCouponService, UpdateCouponService, DeleteCouponService };
