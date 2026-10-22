"use client";

import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import GoogleIcon from "./GoogleIcon";
import { SignUpFormProps } from "../types/auth.types";
import { useSignUpForm } from "../hooks/useSignUpForm";

export default function SignUpForm(props: Partial<SignUpFormProps> = {}) {
  const {
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
  } = useSignUpForm(props);

  return (
    <div className="flex flex-col gap-3.5">
      {activeError && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
          {activeError}
        </div>
      )}

      <button
        type="button"
        onClick={handleGoogleSignUp}
        disabled={isBusy || isGoogleLoading}
        className="w-full h-10 px-4 rounded-xl border border-warm-gray bg-surface text-charcoal hover:bg-cream hover:border-sage/50 transition-colors flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold shadow-xs disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {isGoogleLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-muted-gray" />
        ) : (
          <GoogleIcon className="w-4 h-4 shrink-0" />
        )}
        <span>Continue with Google</span>
      </button>

      <div className="relative flex items-center justify-center my-0.5">
        <div className="w-full border-t border-warm-gray" />
        <span className="absolute bg-surface px-3 text-[11px] uppercase tracking-wider text-muted-gray">
          or continue with email
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Full Name"
            type="text"
            placeholder="Jane Doe"
            autoComplete="name"
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password"
            error={errors.password?.message}
            rightElement={
              <button
                type="button"
                onClick={togglePassword}
                className="text-muted-gray hover:text-charcoal transition-colors p-1 rounded-md focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            }
            {...register("password")}
          />

          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            rightElement={
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="text-muted-gray hover:text-charcoal transition-colors p-1 rounded-md focus:outline-none"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            }
            {...register("confirmPassword")}
          />
        </div>

        <div className="text-[11px] text-muted-gray leading-tight pt-0.5">
          By creating an account, you agree to Clothset&apos;s{" "}
          <Link href="/faq" className="text-forest dark:text-sage underline underline-offset-2">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/faq" className="text-forest dark:text-sage underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </div>

        <div className="pt-1">
          <Button
            type="submit"
            variant="primary"
            className="w-full h-10 font-semibold text-sm"
            isLoading={isBusy}
          >
            Create Account
          </Button>
        </div>

        <div className="text-center pt-0.5">
          <span className="text-xs text-muted-gray">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-charcoal hover:underline"
            >
              Sign in
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
