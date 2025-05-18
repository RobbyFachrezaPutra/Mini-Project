import { Router } from "express";
import {
  CreateReviewController,
  GetReviewByTransactionController,
} from "../controllers/review.controller";

const router = Router();

router.post("/", CreateReviewController);
router.get("/:transaction_id", GetReviewByTransactionController);

export default router;
