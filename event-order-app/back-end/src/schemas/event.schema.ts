import { z } from "zod";

export const eventSchema = z.object({
  name: z.string().nonempty("Event name is required"),
  location: z.string().nonempty("Location is required"),
  available_seats: z
    .number()
    .nonnegative("Available seats is required")
    .refine((val) => val > 0, {
      message: "Available seats must be greater than 0",
      path: ["available_seats"],
    }),
  status: z.enum(["Draft", "Publish"]),
});
