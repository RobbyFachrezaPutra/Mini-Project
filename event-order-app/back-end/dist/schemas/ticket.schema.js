"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketSchema = void 0;
const zod_1 = require("zod");
exports.ticketSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Ticket name is required"),
    type: zod_1.z.string().nonempty("Ticket Type is required"),
    quota: zod_1.z
        .number()
        .nonnegative("Quota seats is required")
        .refine((val) => val > 0, {
        message: "Quota seats must be greater than 0",
        path: ["quota"],
    }),
    event_id: zod_1.z
        .number()
        .nonnegative("Event is required")
        .refine((val) => val > 0, {
        message: "Event must be selected",
        path: ["event_id"],
    })
});
