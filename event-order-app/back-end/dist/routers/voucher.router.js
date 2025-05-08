"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const voucher_controller_1 = require("../controllers/voucher.controller");
const validator_middleware_1 = __importDefault(require("../middlewares/validator.middleware"));
const voucher_schema_1 = require("../schemas/voucher.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.VerifyToken, auth_middleware_1.requireEventOrganizerRole, (0, validator_middleware_1.default)(voucher_schema_1.voucherSchema), voucher_controller_1.CreateVoucherController);
router.get("/", auth_middleware_1.VerifyToken, voucher_controller_1.GetAllVoucherController);
router.get("/:id", auth_middleware_1.VerifyToken, voucher_controller_1.GetVoucherController);
router.put("/:id", auth_middleware_1.VerifyToken, auth_middleware_1.requireEventOrganizerRole, (0, validator_middleware_1.default)(voucher_schema_1.voucherSchema), voucher_controller_1.UpdateVoucherController);
router.delete("/:id", auth_middleware_1.VerifyToken, auth_middleware_1.requireEventOrganizerRole, voucher_controller_1.DeleteVoucherController);
exports.default = router;
