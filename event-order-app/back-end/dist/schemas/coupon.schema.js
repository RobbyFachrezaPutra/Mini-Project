"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponSchema = void 0;
const zod_1 = require("zod");
exports.couponSchema = zod_1.z.object({
    code: zod_1.z.string(),
    discount_amount: zod_1.z
        .number()
        .min(1, "minimal discount 1%")
        .max(100, "Maksimal discount 100%"),
    max_usage: zod_1.z.number().min(1, "maksimal coupon 1 kali dipakai"),
    is_active: zod_1.z.boolean(),
    created_by_id: zod_1.z.number(),
    created_at: zod_1.z.date().optional(),
});
