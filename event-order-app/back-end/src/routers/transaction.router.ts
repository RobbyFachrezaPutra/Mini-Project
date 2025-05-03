import { Router } from "express";
import { 
  CreateTransactionController, 
  GetAllTransactionController, 
  GetTransactionController, 
  UpdateTransactionController } from "../controllers/transaction.controller";
import ReqValidator from "../middlewares/validator.middleware";
import { transactionSchema } from "../schemas/transaction.schema";
import {
  VerifyToken
} from "../middlewares/auth.middleware";

const router = Router();

router.post("/", VerifyToken, ReqValidator(transactionSchema),  CreateTransactionController);
router.get("/", VerifyToken, GetAllTransactionController);
router.get("/:id", VerifyToken, GetTransactionController);
router.put("/:id", VerifyToken, ReqValidator(transactionSchema),  UpdateTransactionController);

export default router;
