import { z } from "zod";

export const clothingCategorySchema = z.enum([
  "TOPS",
  "BOTTOMS",
  "OUTERWEAR",
  "DRESSES",
  "FOOTWEAR",
  "ACCESSORIES",
]);
export type ClothingCategory = z.infer<typeof clothingCategorySchema>;

export const clothingSeasonSchema = z.enum([
  "spring",
  "summer",
  "fall",
  "winter",
  "all-season",
]);
export type ClothingSeason = z.infer<typeof clothingSeasonSchema>;

export const createClothingSchema = z.object({
  closetId: z.string().uuid(),
  name: z.string().min(2, "Garment name must be at least 2 characters"),
  category: clothingCategorySchema,
  subcategory: z.string().optional(),
  color: z.string().optional(),
  brand: z.string().optional(),
  material: z.string().optional(),
  style: z.string().optional(),
  seasons: z.array(z.string()).default([]),
  occasions: z.array(z.string()).default([]),
  description: z.string().optional(),
  imageKey: z.string().optional(),
  thumbnailKey: z.string().optional(),
  isFavorite: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});
export type CreateClothingInput = z.infer<typeof createClothingSchema>;

export const updateClothingSchema = createClothingSchema.partial().omit({ closetId: true });
export type UpdateClothingInput = z.infer<typeof updateClothingSchema>;

export const clothingResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  closetId: z.string().uuid(),
  name: z.string(),
  category: clothingCategorySchema,
  subcategory: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  brand: z.string().nullable().optional(),
  material: z.string().nullable().optional(),
  style: z.string().nullable().optional(),
  seasons: z.array(z.string()),
  occasions: z.array(z.string()),
  description: z.string().nullable().optional(),
  imageKey: z.string().nullable().optional(),
  thumbnailKey: z.string().nullable().optional(),
  isFavorite: z.boolean(),
  isArchived: z.boolean(),
  aiSuggested: z.boolean(),
  isConfirmed: z.boolean(),
  aiMetadata: z.unknown().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});
export type ClothingResponse = z.infer<typeof clothingResponseSchema>;
