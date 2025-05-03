import { Router } from "express";
import { CreateEventController, GetAllEventController, GetEventController, UpdateEventController, DeleteEventController } from "../controllers/event.controller";
import ReqValidator from "../middlewares/validator.middleware";
import { eventSchema } from "../schemas/event.schema";
import {
  VerifyToken,
  requireEventOrganizerRole,
} from "../middlewares/auth.middleware";

const router = Router();

router.post("/", VerifyToken, requireEventOrganizerRole, ReqValidator(eventSchema),  CreateEventController);
router.get("/", VerifyToken, GetAllEventController);
router.get("/:id", VerifyToken, GetEventController);
router.put("/:id", VerifyToken, requireEventOrganizerRole, ReqValidator(eventSchema),  UpdateEventController);
router.delete("/:id", VerifyToken, requireEventOrganizerRole, DeleteEventController);

export default router;
