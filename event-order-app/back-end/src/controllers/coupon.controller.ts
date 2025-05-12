import { Request, Response, NextFunction } from "express";
import { GetCouponByUserIdService, CreateCouponService, GetAllCouponService, GetCouponService, UpdateCouponService, DeleteCouponService } from "../services/coupon.service";

async function CreateCouponController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await CreateCouponService(req.body);

    res.status(200).send({
      message: "Coupon successfully saved",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function GetAllCouponController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await GetAllCouponService();

    res.status(200).send({
      message: "Get All Coupon",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function GetCouponController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await GetCouponService(Number(req.params.id));

    res.status(200).send({
      message: `Get Coupon with id ${req.params.id}`,
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function GetCouponByUserIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await GetCouponByUserIdService(Number(req.params.user_id));

    res.status(200).send({
      message: `Get Coupon with id ${req.params.id}`,
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function UpdateCouponController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await UpdateCouponService(Number(req.params.id), req.body);

    res.status(200).send({
      message: "Coupon successfully updated",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function DeleteCouponController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await DeleteCouponService(Number(req.params.id));

    res.status(200).send({
      message: "Coupon successfully deleted",
      data,
    });
  } catch (err) {
    next(err);
  }
}

export { GetCouponByUserIdController, CreateCouponController, GetAllCouponController, GetCouponController, UpdateCouponController, DeleteCouponController };
