import { z } from "zod";
import { userPlanSchema } from "./user.schema";

export const closetTypeSchema = z.enum([
  "EVERYDAY",
  "WORK",
  "FORMAL",
  "SEASONAL",
  "CAPSULE",
  "CUSTOM",
]);
export type ClosetType = z.infer<typeof closetTypeSchema>;

export const wardrobeTemplateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, "Template name must be at least 2 characters"),
  description: z.string().nullable().optional(),
  type: closetTypeSchema.default("EVERYDAY"),
  minTier: userPlanSchema.default("FREE"),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});
export type WardrobeTemplate = z.infer<typeof wardrobeTemplateSchema>;

export const createWardrobeTemplateSchema = z.object({
  name: z.string().min(2, "Template name must be at least 2 characters"),
  description: z.string().optional(),
  type: closetTypeSchema.default("EVERYDAY"),
  minTier: userPlanSchema.default("FREE"),
});
export type CreateWardrobeTemplateInput = z.infer<typeof createWardrobeTemplateSchema>;

export const updateWardrobeTemplateSchema = createWardrobeTemplateSchema.partial();
export type UpdateWardrobeTemplateInput = z.infer<typeof updateWardrobeTemplateSchema>;

export const activateTemplateSchema = z.object({
  templateId: z.string().uuid(),
});
export type ActivateTemplateInput = z.infer<typeof activateTemplateSchema>;

export const createClosetSchema = z.object({
  name: z.string().min(2, "Closet name must be at least 2 characters"),
  type: closetTypeSchema.default("EVERYDAY"),
  description: z.string().optional(),
  maxItems: z.number().int().positive().optional(),
  templateId: z.string().uuid().optional(),
});
export type CreateClosetInput = z.infer<typeof createClosetSchema>;

export const updateClosetSchema = createClosetSchema.partial();
export type UpdateClosetInput = z.infer<typeof updateClosetSchema>;

export const closetResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  templateId: z.string().uuid().nullable().optional(),
  name: z.string(),
  type: closetTypeSchema,
  description: z.string().nullable().optional(),
  maxItems: z.number().int(),
  clothesCount: z.number().int().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});
export type ClosetResponse = z.infer<typeof closetResponseSchema>;
