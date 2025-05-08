"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_category_controller_1 = require("../controllers/event-category.controller");
const validator_middleware_1 = __importDefault(require("../middlewares/validator.middleware"));
const event_category_schema_1 = require("../schemas/event-category.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.VerifyToken, auth_middleware_1.requireAdminRole, (0, validator_middleware_1.default)(event_category_schema_1.eventCategorySchema), event_category_controller_1.CreateEventCategoryController);
router.get("/:id", auth_middleware_1.VerifyToken, event_category_controller_1.GetEventCategoryController);
router.get("/", auth_middleware_1.VerifyToken, event_category_controller_1.GetAllEventCategoryController);
router.put("/:id", auth_middleware_1.VerifyToken, auth_middleware_1.requireAdminRole, (0, validator_middleware_1.default)(event_category_schema_1.eventCategorySchema), event_category_controller_1.UpdateEventCategoryController);
exports.default = router;
