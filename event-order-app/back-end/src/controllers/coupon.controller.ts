import { Request, Response, NextFunction } from "express";
import { CouponService } from "../services/coupon.service";

async function CouponController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await CouponService(req.body);

    res.status(200).send({
      message: "Coupon berhasil dibuat",
      data,
    });
  } catch (err) {
    next(err);
  }
}

export { CouponController };
