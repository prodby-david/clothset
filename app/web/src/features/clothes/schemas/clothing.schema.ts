import { z } from "zod";

export const clothingSchema = z.object({
  name: z.string().min(2, "Item name must be at least 2 characters"),
  category: z.string().min(1, "Please select a category"),
  color: z.string().min(1, "Please specify a primary color"),
  season: z.string().min(1, "Please select a season"),
  imageUrl: z.string().optional(),
});
