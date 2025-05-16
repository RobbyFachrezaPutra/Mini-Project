import { Router } from "express";
import {
  GetMonthlyRevenueController,
  GetTicketsSoldByEventCategoryController,
} from "../controllers/statistic.controller";

const router = Router();

router.get("/monthly-revenue/:organizerId", GetMonthlyRevenueController);
router.get(
  "/ticket-by-category/:organizerId",
  GetTicketsSoldByEventCategoryController
);

export default router;
