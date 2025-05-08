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
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.VerifyToken, auth_middleware_1.requireEventOrganizerRole, (0, validator_middleware_1.default)(event_schema_1.eventSchema), event_controller_1.CreateEventController);
router.get("/", event_controller_1.GetAllEventController);
router.get("/:id", auth_middleware_1.VerifyToken, event_controller_1.GetEventController);
router.put("/:id", auth_middleware_1.VerifyToken, auth_middleware_1.requireEventOrganizerRole, (0, validator_middleware_1.default)(event_schema_1.eventSchema), event_controller_1.UpdateEventController);
router.delete("/:id", auth_middleware_1.VerifyToken, auth_middleware_1.requireEventOrganizerRole, event_controller_1.DeleteEventController);
exports.default = router;
