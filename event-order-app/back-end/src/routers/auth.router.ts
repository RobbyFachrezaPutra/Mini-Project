import { Router } from "express";
import RegisterController from "../controllers/auth.controller";
import ReqValidator from "../middlewares/validator.middleware";
import { registerSchema } from "../schemas/user.schema";

const router = Router();

router.post("/register", ReqValidator(registerSchema), RegisterController);

export default router;
