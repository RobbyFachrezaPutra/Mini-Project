import { Router } from "express";
import { forgotPasswordController } from "../controllers/forgot-password.controller";

const router = Router();

router.patch("/", forgotPasswordController);

export default router;
