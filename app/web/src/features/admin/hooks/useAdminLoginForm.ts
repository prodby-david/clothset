"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminSignInSchema } from "../schemas/admin.schema";
import { adminLoginApi } from "../api/admin.api";
import { setAdminTokenCookie } from "../lib/admin-cookies";

export function useAdminLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parseResult = adminSignInSchema.safeParse({ email, password });
    if (!parseResult.success) {
      setError(parseResult.error.issues[0]?.message || "Invalid input data");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await adminLoginApi(parseResult.data);
      setAdminTokenCookie(result.token);
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in to administrator console");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isSubmitting,
    handleSubmit,
  };
}
