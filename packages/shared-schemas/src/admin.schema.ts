import { z } from "zod";

export const adminSignInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export type AdminSignInInput = z.infer<typeof adminSignInSchema>;

export const adminSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});
export type Admin = z.infer<typeof adminSchema>;
