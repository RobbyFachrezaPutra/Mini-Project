"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionSchema = void 0;
const zod_1 = require("zod");
exports.transactionSchema = zod_1.z.object({
    qty: zod_1.z
        .number()
        .nonnegative("Quantity is required")
        .refine((val) => val > 0, {
        message: "Quantity must be greater than 0",
        path: ["Quantity"],
    }),
    event_id: zod_1.z
        .number()
        .nonnegative("Event is required")
        .refine((val) => val > 0, {
        message: "Event must be greater than 0",
        path: ["event_id"],
    }),
    ticket_id: zod_1.z
        .number()
        .nonnegative("Ticket is required")
        .refine((val) => val > 0, {
        message: "Ticket must be greater than 0",
        path: ["ticket_id"],
    }),
    status: zod_1.z.enum(["waiting_for_payment", "waiting_for_admin_confirmation", "done", "rejected", "expired", "canceled"])
});
