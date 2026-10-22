"use client";

import React from "react";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import { useAdminLoginForm } from "../hooks/useAdminLoginForm";

export default function AdminLoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isSubmitting,
    handleSubmit,
  } = useAdminLoginForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      {error && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-charcoal">
          Admin Email
        </label>
        <div className="relative">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@clothset.app"
            required
            autoComplete="username"
            className="pl-9 h-11 text-xs"
          />
          <Mail className="w-4 h-4 text-muted-gray absolute left-3 top-3.5 pointer-events-none" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-charcoal">
          Password
        </label>
        <div className="relative">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            autoComplete="current-password"
            className="pl-9 h-11 text-xs"
          />
          <Lock className="w-4 h-4 text-muted-gray absolute left-3 top-3.5 pointer-events-none" />
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full mt-2 h-11 text-xs font-bold gap-2 shadow-xs"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Verifying Credentials...</span>
          </>
        ) : (
          <>
            <span>Sign In to Admin Console</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </form>
  );
}
