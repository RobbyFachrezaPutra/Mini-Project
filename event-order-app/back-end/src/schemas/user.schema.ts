import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Invalid Email Format").trim(),
  password: z.string().nonempty("Password is required"),
  first_name: z.string().nonempty("First name is required"),
  last_name: z.string().nonempty("Last name is required"),
  role: z.enum(["customer", "event_organizer"]),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid Email Format"),
  password: z.string().nonempty("Password is required"),
});
