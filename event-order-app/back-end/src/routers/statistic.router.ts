import { Router } from "express";
import {
  GetMonthlyRevenueController,
  GetTicketsSoldByCategoryController,
} from "../controllers/statistic.controller";

const router = Router();

router.get("/monthly-revenue", GetMonthlyRevenueController);
router.get("/ticket-by-category", GetTicketsSoldByCategoryController);

export default router;
