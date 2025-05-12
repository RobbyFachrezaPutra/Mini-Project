import { Router } from "express";
import { 
  GetPointByUserIdController, 
   } from "../controllers/point.controller";
import {
  VerifyToken,
  requireAdminRole
} from "../middlewares/auth.middleware";

const router = Router();

router.get("/by-user/:user_id", VerifyToken, GetPointByUserIdController);

export default router;
