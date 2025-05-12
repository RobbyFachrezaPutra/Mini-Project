import { Router } from "express";
import { 
  CreateEventController, 
  GetAllEventController, 
  GetEventController, 
  UpdateEventController, 
  DeleteEventController,
  SearchEventController
} from "../controllers/event.controller";
import ReqValidator from "../middlewares/validator.middleware";
import { eventSchema } from "../schemas/event.schema";
import {
  VerifyToken,
  requireEventOrganizerRole,
} from "../middlewares/auth.middleware";
import multer from 'multer';
import { uploadSingle } from "../middlewares/upload.middleware";
const upload = multer();
const router = Router();

router.post("/", VerifyToken, requireEventOrganizerRole, uploadSingle('banner_url'), CreateEventController);
router.get("/", GetAllEventController);
router.get("/search", SearchEventController);
router.get("/:id", GetEventController);
router.put("/:id", VerifyToken, requireEventOrganizerRole, ReqValidator(eventSchema),  UpdateEventController);
router.delete("/:id", VerifyToken, requireEventOrganizerRole, DeleteEventController);

export default router;