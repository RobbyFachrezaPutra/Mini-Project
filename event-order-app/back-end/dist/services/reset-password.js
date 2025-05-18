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
exports.resetPasswordService = void 0;
const bcrypt_1 = require("bcrypt");
const prisma_1 = __importDefault(require("../lib/prisma"));
const hashPassword = (password) => {
    const salt = (0, bcrypt_1.genSaltSync)(10);
    return (0, bcrypt_1.hash)(password, salt);
};
const resetPasswordService = (userId, currentPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Cari user
    const user = yield prisma_1.default.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, password: true },
    });
    if (!user) {
        throw new Error("User not found");
    }
    // 2. Verifikasi password lama
    const isMatch = yield (0, bcrypt_1.compare)(currentPassword, user.password);
    if (!isMatch) {
        throw new Error("Current password is incorrect");
    }
    // 3. Hash password baru
    const hashedPassword = yield hashPassword(newPassword);
    // 4. Update password
    yield prisma_1.default.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
    });
    return {
        message: "Password updated successfully",
        data: {
            id: user.id,
            email: user.email,
        },
    };
});
exports.resetPasswordService = resetPasswordService;
