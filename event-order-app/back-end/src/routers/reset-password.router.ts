import { Router } from "express";
import { resetPasswordController } from "../controllers/reset-password";
import { VerifyToken } from "../middlewares/auth.middleware";
import ReqValidator from "../middlewares/validator.middleware";
import { resetPasswordSchema } from "../schemas/reset-password.schema";

const router = Router();

router.patch(
  "/",
  VerifyToken,
  ReqValidator(resetPasswordSchema),
  resetPasswordController
);

export default router;
