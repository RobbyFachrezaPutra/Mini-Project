import { z } from "zod";

export const transactionSchema = z.object({
  qty: z
    .number()
    .nonnegative("Quantity is required")
    .refine((val) => val > 0, {
      message: "Quantity must be greater than 0",
      path: ["Quantity"],
    }),
  event_id: z
    .number()
    .nonnegative("Event is required")
    .refine((val) => val > 0, {
      message: "Event must be greater than 0",
      path: ["event_id"],
    }),
  ticket_id: z
    .number()
    .nonnegative("Ticket is required")
    .refine((val) => val > 0, {
      message: "Ticket must be greater than 0",
      path: ["ticket_id"],
    }),
  status: z.enum(["waiting_for_payment", "waiting_for_admin_confirmation", "done", "rejected","expired","canceled"])
});