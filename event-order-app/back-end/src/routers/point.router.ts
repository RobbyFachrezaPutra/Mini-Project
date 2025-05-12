import { Router } from "express";
import { 
  GetPointByUserIdController, 
   } from "../controllers/point.controller";
import ReqValidator from "../middlewares/validator.middleware";
import { couponSchema } from "../schemas/coupon.schema";
import {
  VerifyToken,
  requireAdminRole
} from "../middlewares/auth.middleware";

const router = Router();

router.get("/by-user/:user_id", VerifyToken, GetPointByUserIdController);

export default router;
