import { date } from "zod";
import { ICoupon } from "../interface/coupon.interface";
import prisma from "../lib/prisma";

async function CouponService(data: ICoupon) {
  try {
    const coupon = await prisma.coupon.create({
      data: {
        code: data.code,
        discount_amount: data.discount_amount,
        max_usage: data.max_usage,
        is_active: data.is_active,
        created_by_id: data.created_by_id,
        created_at: new Date(),
        updated_at: new Date(),
        expired_at: Date()
      },
    });
    return coupon;
  } catch (err) {
    throw err;
  }
}

export { CouponService };
