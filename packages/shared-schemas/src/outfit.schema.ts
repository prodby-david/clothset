import { z } from "zod";

export const outfitSlotSchema = z.enum([
  "TOP",
  "BOTTOM",
  "OUTERWEAR",
  "FOOTWEAR",
  "ACCESSORY",
]);
export type OutfitSlot = z.infer<typeof outfitSlotSchema>;

export const outfitItemSchema = z.object({
  clothingItemId: z.string().uuid(),
  slot: outfitSlotSchema.default("TOP"),
});
export type OutfitItemInput = z.infer<typeof outfitItemSchema>;

export const createOutfitSchema = z.object({
  closetId: z.string().uuid().optional(),
  name: z.string().min(2, "Outfit name must be at least 2 characters"),
  occasion: z.string().optional(),
  reason: z.string().optional(),
  isSaved: z.boolean().default(false),
  items: z.array(outfitItemSchema).min(1, "An outfit must have at least one clothing piece"),
});
export type CreateOutfitInput = z.infer<typeof createOutfitSchema>;

export const outfitResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  closetId: z.string().uuid().nullable().optional(),
  name: z.string(),
  occasion: z.string().nullable().optional(),
  reason: z.string().nullable().optional(),
  isSaved: z.boolean(),
  items: z.array(
    z.object({
      id: z.string().uuid(),
      outfitId: z.string().uuid(),
      clothingItemId: z.string().uuid(),
      slot: outfitSlotSchema,
      createdAt: z.string(),
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});
export type OutfitResponse = z.infer<typeof outfitResponseSchema>;
