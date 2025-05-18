"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
const validator_middleware_1 = __importDefault(require("../middlewares/validator.middleware"));
const event_schema_1 = require("../schemas/event.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const router = (0, express_1.Router)();
// Create event
router.post("/", auth_middleware_1.VerifyToken, auth_middleware_1.requireEventOrganizerRole, (0, upload_middleware_1.uploadSingle)("banner_url"), event_controller_1.CreateEventController);
// Get all events
router.get("/", event_controller_1.GetAllEventController);
// Search events
router.get("/search", event_controller_1.SearchEventController);
// Get events by organizer
router.get("/organizer/:organizerId", auth_middleware_1.VerifyToken, auth_middleware_1.requireEventOrganizerRole, event_controller_1.GetEventsByOrganizerController);
// Get attendees of event
router.get("/:eventId/attendees", auth_middleware_1.VerifyToken, auth_middleware_1.requireEventOrganizerRole, event_controller_1.GetAttendeesByEventController);
// Get single event
router.get("/:id", event_controller_1.GetEventController);
// Update event
router.put("/:id", auth_middleware_1.VerifyToken, auth_middleware_1.requireEventOrganizerRole, (0, validator_middleware_1.default)(event_schema_1.eventSchema), event_controller_1.UpdateEventController);
// Delete event
router.delete("/:id", auth_middleware_1.VerifyToken, auth_middleware_1.requireEventOrganizerRole, event_controller_1.DeleteEventController);
exports.default = router;
