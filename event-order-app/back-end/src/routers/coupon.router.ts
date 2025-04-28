import { Router } from "express";
import { CouponController } from "../controllers/coupon.controller";
import ReqValidator from "../middlewares/validator.middleware";
import { couponSchema } from "../schemas/coupon.schema";

const router = Router();

router.post("/create-coupon", ReqValidator(couponSchema), CouponController);

export default router;
