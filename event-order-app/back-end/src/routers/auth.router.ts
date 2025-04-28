import { Router } from "express";
import {
  RegisterController,
  LoginController,
  UserController,
} from "../controllers/auth.controller";
import ReqValidator from "../middlewares/validator.middleware";
import { loginSchema, registerSchema } from "../schemas/user.schema";
import {
  VerifyToken,
  requireEventOrganizerRole,
} from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", ReqValidator(registerSchema), RegisterController);
router.post("/login", ReqValidator(loginSchema), LoginController);
router.get("/", VerifyToken, requireEventOrganizerRole, UserController);

export default router;
