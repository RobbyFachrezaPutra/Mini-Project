import { z } from "zod";

export const voucherSchema = z.object({
  code: z.string().nonempty("Voucher name is required"),
  event_id: z
    .number()
    .nonnegative("Event is required")
    .refine((val) => val > 0, {
      message: "Event must be selected",
      path: ["event_id"],
    })
  });
