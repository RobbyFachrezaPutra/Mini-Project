"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reset_password_1 = require("../controllers/reset-password");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validator_middleware_1 = __importDefault(require("../middlewares/validator.middleware"));
const reset_password_schema_1 = require("../schemas/reset-password.schema");
const router = (0, express_1.Router)();
router.patch("/", auth_middleware_1.VerifyToken, (0, validator_middleware_1.default)(reset_password_schema_1.resetPasswordSchema), reset_password_1.resetPasswordController);
exports.default = router;
