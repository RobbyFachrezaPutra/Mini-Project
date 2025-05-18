"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordController = exports.forgotPasswordController = void 0;
const forgot_password_service_1 = require("../services/forgot-password.service");
// Controller untuk mengirim email reset password
const forgotPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ message: "Email diperlukan" });
            return;
        }
        const result = yield (0, forgot_password_service_1.sendResetLinkWithToken)(email);
        // Mengembalikan URL preview Ethereal untuk testing
        res.status(200).json({
            message: result.message,
            previewUrl: result.previewUrl,
        });
        return;
    }
    catch (error) {
        console.error("Error in forgotPasswordController:", error);
        if (error.message === "User tidak ditemukan") {
            res.status(404).json({ message: "Email tidak terdaftar" });
            return;
        }
        res.status(500).json({ message: "Gagal mengirim email reset password" });
        return;
    }
});
exports.forgotPasswordController = forgotPasswordController;
// Controller untuk reset password dengan token
const resetPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, password } = req.body;
        if (!token || !password) {
            res.status(400).json({ message: "Token dan password diperlukan" });
            return;
        }
        const result = yield (0, forgot_password_service_1.resetPasswordWithToken)(token, password);
        res.status(200).json(result);
        return;
    }
    catch (error) {
        console.error("Error in resetPasswordController:", error);
        if (error.message === "Token tidak valid atau sudah kadaluarsa") {
            res.status(400).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Gagal mengubah password" });
        return;
    }
});
exports.resetPasswordController = resetPasswordController;
