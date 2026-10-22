import type { WardrobeTemplateItem } from "@/features/closets/types/closet.types";
import type { AdminSignInInput } from "../schemas/admin.schema";

export type { AdminSignInInput };

export interface Admin {
  id: string;
  email: string;
  name?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminAuthResponse {
  admin: Admin;
  token: string;
}

export interface AdminTemplateFormData {
  name: string;
  description?: string;
  type: string;
  minTier: "FREE" | "PLUS" | "ELITE";
}

export interface AdminTemplateFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminTemplateFormData) => Promise<void>;
  initialData?: WardrobeTemplateItem | null;
}

export interface AdminLoginFormProps {
  onSubmit: (data: AdminSignInInput) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}
