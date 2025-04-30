import { ICoupon } from "../interface/coupon.interface";
import prisma from "../lib/prisma";

async function CouponService(data: ICoupon) {
  const expiredAt = new Date(new Date().setMonth(new Date().getMonth() + 3));
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
        expired_at: expiredAt,
      },
    });
    return coupon;
  } catch (err) {
    throw err;
  }
}

export { CouponService };
