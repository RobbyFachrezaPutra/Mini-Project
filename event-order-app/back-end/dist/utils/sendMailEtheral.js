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
        const { transporter } = yield (0, nodemailer_1.createEtherealTransporter)();
        const info = yield transporter.sendMail({
            from: '"Event Order App" <no-reply@eventorder.com>',
            to,
            subject,
            html,
        });
        // Return preview URL untuk dicek di browser
        return require("nodemailer").getTestMessageUrl(info);
    });
}
