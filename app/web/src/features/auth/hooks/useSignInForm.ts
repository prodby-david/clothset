"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData, SignInFormProps } from "../types/auth.types";
import { useAuth } from "./useAuth";

export function useSignInForm({
  onSubmit: externalSubmit,
  onGoogleSignIn: externalGoogleSignIn,
  isLoading: externalLoading,
  error: externalError,
}: Partial<SignInFormProps> = {}) {
  const { login, loginWithGoogle } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setErrorMessage(null);
      if (externalSubmit) {
        await externalSubmit(data);
      } else {
        await login(data);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Failed to sign in. Please verify your credentials.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      setErrorMessage(null);
      if (externalGoogleSignIn) {
        await externalGoogleSignIn();
      } else {
        await loginWithGoogle();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Google authentication failed. Please try again.");
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleRememberMe = () => setRememberMe((prev) => !prev);

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
    rememberMe,
    togglePassword,
    toggleRememberMe,
    onSubmit,
    handleGoogleSignIn,
  };
}
export default useSignInForm;
