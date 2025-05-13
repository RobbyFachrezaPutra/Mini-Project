import { Router } from "express";
import {
  CreateEventController,
  GetAllEventController,
  GetEventController,
  UpdateEventController,
  DeleteEventController,
  SearchEventController,
  GetEventsByOrganizerController,
  GetAttendeesByEventController,
} from "../controllers/event.controller";
import ReqValidator from "../middlewares/validator.middleware";
import { eventSchema } from "../schemas/event.schema";
import {
  VerifyToken,
  requireEventOrganizerRole,
} from "../middlewares/auth.middleware";
import { uploadSingle } from "../middlewares/upload.middleware";

const router = Router();

// Create event
router.post(
  "/",
  VerifyToken,
  requireEventOrganizerRole,
  uploadSingle("banner_url"),
  CreateEventController
);

// Get all events
router.get("/", GetAllEventController);

// Search events
router.get("/search", SearchEventController);

// Get events by organizer
router.get(
  "/organizer/:organizerId",
  VerifyToken,
  requireEventOrganizerRole,
  GetEventsByOrganizerController
);

// Get attendees of event
router.get(
  "/:eventId/attendees",
  VerifyToken,
  requireEventOrganizerRole,
  GetAttendeesByEventController
);

// Get single event
router.get("/:id", GetEventController);

// Update event
router.put(
  "/:id",
  VerifyToken,
  requireEventOrganizerRole,
  ReqValidator(eventSchema),
  UpdateEventController
);

// Delete event
router.delete(
  "/:id",
  VerifyToken,
  requireEventOrganizerRole,
  DeleteEventController
);

export default router;
