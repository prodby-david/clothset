"use client";

import ThemeProvider from "./ThemeProvider";
import { AuthProvider } from "@/features/auth/components/AuthProvider";
import { AppProvidersProps } from "@/shared/types/ui.types";

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
