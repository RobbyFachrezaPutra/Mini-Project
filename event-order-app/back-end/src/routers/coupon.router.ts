import { Router } from "express";
import { 
  GetCouponByUserIdController, 
  CreateCouponController, 
  GetAllCouponController, 
  GetCouponController, 
  UpdateCouponController, 
  DeleteCouponController } from "../controllers/coupon.controller";
import ReqValidator from "../middlewares/validator.middleware";
import { couponSchema } from "../schemas/coupon.schema";
import {
  VerifyToken,
  requireAdminRole
} from "../middlewares/auth.middleware";

const router = Router();

router.post("/", VerifyToken, requireAdminRole, ReqValidator(couponSchema),  CreateCouponController);
router.get("/", VerifyToken, GetAllCouponController);
router.get("/by-user/:user_id", VerifyToken, GetCouponByUserIdController);
router.get("/:id", VerifyToken, GetCouponController);
router.put("/:id", VerifyToken, requireAdminRole, ReqValidator(couponSchema),  UpdateCouponController);
router.delete("/:id", VerifyToken, requireAdminRole, DeleteCouponController);

export default router;
