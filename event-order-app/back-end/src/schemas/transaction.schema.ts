import { z } from "zod";

export const transactionSchema = z.object({
  event_id: z
    .number()
    .nonnegative("Event is required")
    .refine((val) => val > 0, {
      message: "Event must be greater than 0",
      path: ["event_id"],
    })
});