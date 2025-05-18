"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coupon_controller_1 = require("../controllers/coupon.controller");
const validator_middleware_1 = __importDefault(require("../middlewares/validator.middleware"));
const coupon_schema_1 = require("../schemas/coupon.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.VerifyToken, auth_middleware_1.requireAdminRole, (0, validator_middleware_1.default)(coupon_schema_1.couponSchema), coupon_controller_1.CreateCouponController);
router.get("/", auth_middleware_1.VerifyToken, coupon_controller_1.GetAllCouponController);
router.get("/by-user/:user_id", auth_middleware_1.VerifyToken, coupon_controller_1.GetCouponByUserIdController);
router.get("/:id", auth_middleware_1.VerifyToken, coupon_controller_1.GetCouponController);
router.put("/:id", auth_middleware_1.VerifyToken, auth_middleware_1.requireAdminRole, (0, validator_middleware_1.default)(coupon_schema_1.couponSchema), coupon_controller_1.UpdateCouponController);
router.delete("/:id", auth_middleware_1.VerifyToken, auth_middleware_1.requireAdminRole, coupon_controller_1.DeleteCouponController);
exports.default = router;
