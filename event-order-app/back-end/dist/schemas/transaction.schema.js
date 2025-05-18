"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionSchema = void 0;
const zod_1 = require("zod");
exports.transactionSchema = zod_1.z.object({
    event_id: zod_1.z
        .number()
        .nonnegative("Event is required")
        .refine((val) => val > 0, {
        message: "Event must be greater than 0",
        path: ["event_id"],
    })
});
