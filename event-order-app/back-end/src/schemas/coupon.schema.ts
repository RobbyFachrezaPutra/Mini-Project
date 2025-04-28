import { z } from "zod";

export const couponSchema = z.object({
  code: z.string(),
  discount_amount: z
    .number()
    .min(1, "minimal discount 1%")
    .max(100, "Maksimal discount 100%"),
  max_usage: z.number().min(1, "maksimal coupon 1 kali dipakai"),
  is_active: z.boolean(),
  created_by_id: z.number(),
  created_at: z.date().optional(),
});
