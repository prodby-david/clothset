import { z } from "zod";

export const userPlanSchema = z.enum(["FREE", "PLUS", "ELITE"]);
export type UserPlan = z.infer<typeof userPlanSchema>;

export const TIER_LIMITS = {
  FREE: { maxClosets: 2, maxItemsPerCloset: 20 },
  PLUS: { maxClosets: 5, maxItemsPerCloset: 30 },
  ELITE: { maxClosets: 8, maxItemsPerCloset: 50 },
} as const;

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().nullable().optional(),
  plan: userPlanSchema.default("FREE"),
  provider: z.string().nullable().optional(),
  providerId: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});
export type User = z.infer<typeof userSchema>;

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export type SignInInput = z.infer<typeof signInSchema>;
export const loginSchema = signInSchema;
export type LoginInput = SignInInput;

export const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});
export type SignUpInput = z.infer<typeof signUpSchema>;

export const registerSchema = signUpSchema
  .extend({
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type RegisterInput = z.infer<typeof registerSchema>;

export const createUserInputSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  passwordHash: z.string().min(1),
  name: z.string().nullable().optional(),
  plan: userPlanSchema.default("FREE"),
  provider: z.string().nullable().optional(),
  providerId: z.string().nullable().optional(),
});
export type CreateUserInput = z.infer<typeof createUserInputSchema>;

export const updateUserInputSchema = z.object({
  name: z.string().nullable().optional(),
  passwordHash: z.string().optional(),
  plan: userPlanSchema.optional(),
});
export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;
