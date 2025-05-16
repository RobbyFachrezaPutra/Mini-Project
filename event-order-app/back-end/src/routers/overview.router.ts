import { Router } from "express";
import { GetOverviewStatisticController } from "../controllers/overview.controller";

const router = Router();

router.get("/:organizerId", GetOverviewStatisticController);

export default router;
