"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticket_controller_1 = require("../controllers/ticket.controller");
const validator_middleware_1 = __importDefault(require("../middlewares/validator.middleware"));
const ticket_schema_1 = require("../schemas/ticket.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.VerifyToken, auth_middleware_1.requireEventOrganizerRole, (0, validator_middleware_1.default)(ticket_schema_1.ticketSchema), ticket_controller_1.CreateTicketController);
router.get("/", auth_middleware_1.VerifyToken, ticket_controller_1.GetAllTicketController);
router.get("/by-event/:event_id", auth_middleware_1.VerifyToken, ticket_controller_1.GetTicketByEventIdController);
router.get("/:id", auth_middleware_1.VerifyToken, ticket_controller_1.GetTicketController);
router.put("/:id", auth_middleware_1.VerifyToken, auth_middleware_1.requireEventOrganizerRole, (0, validator_middleware_1.default)(ticket_schema_1.ticketSchema), ticket_controller_1.UpdateTicketController);
router.delete("/:id", auth_middleware_1.VerifyToken, auth_middleware_1.requireEventOrganizerRole, ticket_controller_1.DeleteTicketController);
exports.default = router;
