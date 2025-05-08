"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voucherSchema = void 0;
const zod_1 = require("zod");
exports.voucherSchema = zod_1.z.object({
    code: zod_1.z.string().nonempty("Voucher name is required"),
    event_id: zod_1.z
        .number()
        .nonnegative("Event is required")
        .refine((val) => val > 0, {
        message: "Event must be selected",
        path: ["event_id"],
    })
});
