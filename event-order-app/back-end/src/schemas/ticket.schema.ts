import { z } from "zod";

export const ticketSchema = z.object({
  name: z.string().nonempty("Ticket name is required"),
  type: z.string().nonempty("Ticket Type is required"),
  quota: z
    .number()
    .nonnegative("Quota seats is required")
    .refine((val) => val > 0, {
      message: "Quota seats must be greater than 0",
      path: ["quota"],
    }),
  event_id: z
    .number()
    .nonnegative("Event is required")
    .refine((val) => val > 0, {
      message: "Event must be selected",
      path: ["event_id"],
    })
  });
