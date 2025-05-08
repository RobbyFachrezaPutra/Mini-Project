"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventSchema = void 0;
const zod_1 = require("zod");
exports.eventSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Event name is required"),
    location: zod_1.z.string().nonempty("Location is required"),
    available_seats: zod_1.z
        .number()
        .nonnegative("Available seats is required")
        .refine((val) => val > 0, {
        message: "Available seats must be greater than 0",
        path: ["available_seats"],
    }),
    status: zod_1.z.enum(["draft", "publish"]),
});
