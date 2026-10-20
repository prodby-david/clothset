"use client";

import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import GoogleIcon from "./GoogleIcon";
import { SignInFormProps } from "../types/auth.types";
import { useSignInForm } from "../hooks/useSignInForm";

export default function SignInForm(props: Partial<SignInFormProps> = {}) {
  const {
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
  } = useSignInForm(props);

  return (
    <div className="flex flex-col gap-5">
      {activeError && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
          {activeError}
        </div>
      )}

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isBusy || isGoogleLoading}
        className="w-full h-11 px-4 rounded-xl border border-warm-gray bg-surface text-charcoal hover:bg-cream hover:border-sage/50 transition-colors flex items-center justify-center gap-3 text-sm font-semibold shadow-xs disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {isGoogleLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-muted-gray" />
        ) : (
          <GoogleIcon className="w-4 h-4 shrink-0" />
        )}
        <span>Continue with Google</span>
      </button>

      <div className="relative flex items-center justify-center my-1">
        <div className="w-full border-t border-warm-gray" />
        <span className="absolute bg-surface px-3 text-xs uppercase tracking-wider text-muted-gray">
          or continue with email
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          autoComplete="current-password"
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

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 text-charcoal cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={toggleRememberMe}
              className="w-4 h-4 rounded border-warm-gray text-forest focus:ring-sage accent-forest cursor-pointer"
            />
            <span>Remember me for 30 days</span>
          </label>
          <Link
            href="/sign-in"
            className="text-forest hover:text-forest/80 font-medium hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full h-11 font-semibold"
            isLoading={isBusy}
          >
            Sign In
          </Button>
        </div>

        <div className="text-center pt-2">
          <span className="text-xs text-muted-gray">
            Do not have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-charcoal hover:underline"
            >
              Create account
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
