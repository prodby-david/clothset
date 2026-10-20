import type { ReactNode } from "react";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan?: "free" | "premium";
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  children: ReactNode;
}

export interface SignInFormProps {
  onSubmit?: (data: LoginFormData) => Promise<void>;
  onGoogleSignIn?: () => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export interface SignUpFormProps {
  onSubmit?: (data: RegisterFormData) => Promise<void>;
  onGoogleSignUp?: () => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}
