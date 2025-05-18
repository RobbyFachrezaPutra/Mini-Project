"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = void 0;
const zod_1 = require("zod");
exports.resetPasswordSchema = zod_1.z
    .object({
    currentPassword: zod_1.z.string().nonempty("Current password is required"),
    newPassword: zod_1.z
        .string()
        .nonempty("New password is required")
        .min(6, "Password must be at least 6 characters"), // opsional
    confirmPassword: zod_1.z.string().nonempty("Please confirm your password"),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
