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
exports.sendMailEthereal = sendMailEthereal;
const nodemailer_1 = require("./nodemailer");
function sendMailEthereal(to, subject, html) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, nodemailer_1.initEtherealTransporter)();
        const transporter = (0, nodemailer_1.getTransporter)();
        const info = yield transporter.sendMail({
            from: '"Event Order App" <no-reply@eventorder.com>',
            to,
            subject,
            html,
        });
        const previewUrl = require("nodemailer").getTestMessageUrl(info);
        // 🔥 Tambahin log ini biar pasti keliatan
        console.log("📬 EMAIL PREVIEW URL:", previewUrl);
        return previewUrl;
    });
}
