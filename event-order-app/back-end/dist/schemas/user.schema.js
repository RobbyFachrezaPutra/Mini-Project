"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid Email Format").trim(),
    password: zod_1.z.string().nonempty("Password is required"),
    first_name: zod_1.z.string().nonempty("First name is required"),
    last_name: zod_1.z.string().nonempty("Last name is required"),
    role: zod_1.z.enum(["customer", "event_organizer"]),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid Email Format"),
    password: zod_1.z.string().nonempty("Password is required"),
});
