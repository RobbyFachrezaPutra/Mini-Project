import { Router } from "express";
import {
  RegisterController,
  LoginController,
} from "../controllers/auth.controller";
import ReqValidator from "../middlewares/validator.middleware";
import { loginSchema, registerSchema } from "../schemas/user.schema";

const router = Router();

router.post("/register", ReqValidator(registerSchema), RegisterController);
router.post("/login", ReqValidator(loginSchema), LoginController);

export default router;
