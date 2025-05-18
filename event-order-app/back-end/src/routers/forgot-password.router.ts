import { Router } from "express";
import {
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/forgot-password.controller";

const router = Router();

// Route untuk mengirim email reset password
router.post("/", forgotPasswordController);

// Route untuk reset password dengan token
router.post("/reset", resetPasswordController);

export default router;
