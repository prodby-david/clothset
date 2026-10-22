import { z } from "zod";

export const closetSchema = z.object({
  type: z.string().min(1, "Please select a closet type"),
  name: z.string().min(2, "Closet name must be at least 2 characters"),
  description: z.string().optional(),
  maxSize: z.number().min(5).max(300).optional(),
});
