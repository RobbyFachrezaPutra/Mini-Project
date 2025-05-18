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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordWithToken = exports.sendResetLinkWithToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const prisma_1 = __importDefault(require("../lib/prisma"));
// Service untuk mengirim email reset password
const sendResetLinkWithToken = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // Cek apakah user ada
    const user = yield prisma_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw new Error("User tidak ditemukan");
    // Generate token
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET || "secret-key", { expiresIn: "1h" });
    // Buat akun Ethereal untuk testing
    const testAccount = yield nodemailer_1.default.createTestAccount();
    console.log("Ethereal account created:", testAccount);
    // Setup email transporter dengan Ethereal
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });
    // Link reset password
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const resetLink = `${frontendUrl}/new-password?token=${token}`;
    // Kirim email
    const info = yield transporter.sendMail({
        from: '"Tiketin.com" <noreply@tiketin.com>',
        to: email,
        subject: "Reset Password",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Reset Password</h2>
        <p>Anda menerima email ini karena Anda meminta reset password untuk akun Anda.</p>
        <p>Klik tombol di bawah untuk melanjutkan proses reset password (berlaku 1 jam):</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #0ea5e9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Reset Password
          </a>
        </div>
        <p>Jika Anda tidak meminta reset password, abaikan email ini.</p>
      </div>
    `,
    });
    // Log URL preview Ethereal untuk melihat email
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
    return {
        message: "Link reset password telah dikirim ke email Anda",
        previewUrl: nodemailer_1.default.getTestMessageUrl(info), // Mengembalikan URL preview untuk testing
    };
});
exports.sendResetLinkWithToken = sendResetLinkWithToken;
// Service untuk reset password dengan token
const resetPasswordWithToken = (token, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verifikasi token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret-key");
        // Hash password baru
        const bcrypt = require("bcrypt");
        const hashedPassword = yield bcrypt.hash(newPassword, 10);
        // Update password user
        yield prisma_1.default.user.update({
            where: { id: Number(decoded.userId) },
            data: { password: hashedPassword },
        });
        return { message: "Password berhasil diubah" };
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw new Error("Token tidak valid atau sudah kadaluarsa");
        }
        throw error;
    }
});
exports.resetPasswordWithToken = resetPasswordWithToken;
