import { Router } from "express";
import { 
  CreateTransactionController, 
  GetAllTransactionController, 
  GetTransactionController, 
  UpdateTransactionController,
  UploadPaymentProofController,
  GetTransactionByUserIdController
} from "../controllers/transaction.controller";
import ReqValidator from "../middlewares/validator.middleware";
import { transactionSchema } from "../schemas/transaction.schema";
import {
  VerifyToken
} from "../middlewares/auth.middleware";
import { uploadSingle } from "../middlewares/upload.middleware";

const router = Router();

router.put("payment-proof/:id", VerifyToken, uploadSingle('banner_url'), UploadPaymentProofController);
router.post("/", VerifyToken, ReqValidator(transactionSchema),  CreateTransactionController);
router.get("/by-user/:user_id", VerifyToken, GetTransactionByUserIdController);
router.get("/", VerifyToken, GetAllTransactionController);
router.get("/:id", VerifyToken, GetTransactionController);
router.put("/:id", VerifyToken, ReqValidator(transactionSchema),  UpdateTransactionController);

export default router;
