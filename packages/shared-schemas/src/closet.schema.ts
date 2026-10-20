import { z } from "zod";

export const closetTypeSchema = z.enum([
  "EVERYDAY",
  "WORK",
  "FORMAL",
  "SEASONAL",
  "CAPSULE",
  "CUSTOM",
]);
export type ClosetType = z.infer<typeof closetTypeSchema>;

export const createClosetSchema = z.object({
  name: z.string().min(2, "Closet name must be at least 2 characters"),
  type: closetTypeSchema.default("EVERYDAY"),
  description: z.string().optional(),
  maxItems: z.number().int().positive().optional(),
});
export type CreateClosetInput = z.infer<typeof createClosetSchema>;

export const updateClosetSchema = createClosetSchema.partial();
export type UpdateClosetInput = z.infer<typeof updateClosetSchema>;

export const closetResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string(),
  type: closetTypeSchema,
  description: z.string().nullable().optional(),
  maxItems: z.number().int(),
  clothesCount: z.number().int().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});
export type ClosetResponse = z.infer<typeof closetResponseSchema>;
