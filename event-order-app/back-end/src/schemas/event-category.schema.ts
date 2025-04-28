import { z } from "zod";

export const eventCategorySchema = z.object({
  name: z.string().nonempty("Category name is required"),
});
