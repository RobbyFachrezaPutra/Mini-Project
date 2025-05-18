"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const forgot_password_controller_1 = require("../controllers/forgot-password.controller");
const router = (0, express_1.Router)();
// Route untuk mengirim email reset password
router.post("/", forgot_password_controller_1.forgotPasswordController);
// Route untuk reset password dengan token
router.post("/reset", forgot_password_controller_1.resetPasswordController);
exports.default = router;
