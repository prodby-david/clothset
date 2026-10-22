import React from "react";
import { Loader2 } from "lucide-react";
import type { ButtonProps } from "@/shared/types/ui.types";

const BASE_STYLES =
  "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 dark:focus:ring-offset-[#111512] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]";

const VARIANT_STYLES = {
  primary:
    "bg-forest text-white hover:bg-forest-dark active:bg-forest-active shadow-xs",
  secondary:
    "bg-pale-sage text-forest dark:text-charcoal hover:bg-pale-sage-hover active:bg-pale-sage-active",
  outline:
    "border border-warm-gray bg-surface text-charcoal hover:bg-cream active:bg-cream-hover shadow-xs",
  ghost:
    "text-charcoal hover:bg-cream active:bg-cream-hover",
  danger:
    "bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-xs",
};

const SIZE_STYLES = {
  sm: "h-9 px-3 text-xs gap-1.5",
  md: "h-11 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
};

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  ref,
  ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`${BASE_STYLES} ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {children}
    </button>
  );
}
