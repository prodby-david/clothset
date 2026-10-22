"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/auth.schema";
import type { RegisterFormData, SignUpFormProps } from "../types/auth.types";
import { useAuth } from "./useAuth";

export function useSignUpForm({
  onSubmit: externalSubmit,
  onGoogleSignUp: externalGoogleSignUp,
  isLoading: externalLoading,
  error: externalError,
}: Partial<SignUpFormProps> = {}) {
  const { register: registerUser, loginWithGoogle } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setErrorMessage(null);
      if (externalSubmit) {
        await externalSubmit(data);
      } else {
        await registerUser(data);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Failed to create account. Please try again.");
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsGoogleLoading(true);
      setErrorMessage(null);
      if (externalGoogleSignUp) {
        await externalGoogleSignUp();
      } else {
        await loginWithGoogle();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Google signup failed. Please try again.");
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const activeError = externalError || errorMessage;
  const isBusy = externalLoading || isSubmitting;

  return {
    register,
    handleSubmit,
    errors,
    activeError,
    isBusy,
    isGoogleLoading,
    showPassword,
    showConfirmPassword,
    togglePassword,
    toggleConfirmPassword,
    onSubmit,
    handleGoogleSignUp,
  };
}
export default useSignUpForm;
