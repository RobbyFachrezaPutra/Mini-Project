import { Router } from "express";
import { CreateEventCategoryController, GetAllEventCategoryController, GetEventCategoryController, UpdateEventCategoryController } from "../controllers/event-category.controller";
import ReqValidator from "../middlewares/validator.middleware";
import { eventCategorySchema } from "../schemas/event-category.schema";
import {
  VerifyToken,
  requireAdminRole
} from "../middlewares/auth.middleware";

const router = Router();

router.post("/", VerifyToken, ReqValidator(eventCategorySchema),  CreateEventCategoryController);
router.get("/", GetAllEventCategoryController);
router.get("/:id", VerifyToken, GetEventCategoryController);
router.put("/:id", VerifyToken, requireAdminRole, ReqValidator(eventCategorySchema),  UpdateEventCategoryController);

export default router;
