"use client";

import { AuthProvider } from "@/features/auth/hooks/useAuth";
import { AppProvidersProps } from "@/shared/types/ui.types";

export default function AppProviders({ children }: AppProvidersProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
