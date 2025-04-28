import { Router } from "express";
import { CreateEventController, GetAllEventController, GetEventController, UpdateEventController, DeleteEventController } from "../controllers/event.controller";
import ReqValidator from "../middlewares/validator.middleware";
import { eventSchema } from "../schemas/event.schema";

const router = Router();

router.post("/", ReqValidator(eventSchema),  CreateEventController);
router.get("/", GetAllEventController);
router.get("/:id", GetEventController);
router.put("/:id", ReqValidator(eventSchema),  UpdateEventController);
router.delete("/:id", DeleteEventController);

export default router;
