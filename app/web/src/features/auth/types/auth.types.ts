import type { ReactNode } from "react";
import type { z } from "zod";
import type { loginSchema, registerSchema } from "../schemas/auth.schema";

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan?: "FREE" | "PLUS" | "ELITE" | "free" | "premium";
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
