import { Router } from "express";
import { CreateEventCategoryController, GetAllEventCategoryController, GetEventCategoryController, UpdateEventCategoryController } from "../controllers/event-category.controller";
import ReqValidator from "../middlewares/validator.middleware";
import { eventCategorySchema } from "../schemas/event-category.schema";

const router = Router();

router.post("/", ReqValidator(eventCategorySchema),  CreateEventCategoryController);
router.get("/:id", GetEventCategoryController);
router.get("/", GetAllEventCategoryController);
router.put("/:id", ReqValidator(eventCategorySchema),  UpdateEventCategoryController);

export default router;
