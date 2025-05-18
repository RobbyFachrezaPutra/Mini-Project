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
exports.createEtherealTransporter = createEtherealTransporter;
const nodemailer_1 = __importDefault(require("nodemailer"));
/**
 * Membuat transporter Nodemailer menggunakan akun Ethereal (untuk testing).
 * Fungsi ini async karena createTestAccount dan createTransport async.
 */
function createEtherealTransporter() {
    return __awaiter(this, void 0, void 0, function* () {
        // Membuat akun Ethereal baru
        const testAccount = yield nodemailer_1.default.createTestAccount();
        // Membuat transporter dengan credential Ethereal
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true untuk port 465, false untuk 587
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        return { transporter, testAccount };
    });
}
