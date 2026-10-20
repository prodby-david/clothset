"use client";

import React from "react";
import { InputProps } from "@/shared/types/ui.types";

export default function Input({
  label,
  error,
  helperText,
  rightElement,
  className = "",
  id,
  ref,
  ...props
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  const inputDomProps = { ...props };
  delete (inputDomProps as Record<string, unknown>).rightElement;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold uppercase tracking-wider text-muted-gray"
        >
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          id={inputId}
          ref={ref}
          className={`h-11 px-3.5 bg-surface border rounded-xl text-sm text-charcoal placeholder:text-muted-gray/60 transition-colors focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent disabled:bg-cream disabled:cursor-not-allowed shadow-xs w-full ${
            rightElement ? "pr-11" : ""
          } ${
            error ? "border-rose-400 focus:ring-rose-400" : "border-warm-gray"
          } ${className}`}
          {...inputDomProps}
        />
        {rightElement && (
          <div className="absolute right-0 top-0 h-11 px-3 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-rose-600 font-medium">{error}</span>}
      {!error && helperText && (
        <span className="text-xs text-muted-gray">{helperText}</span>
      )}
    </div>
  );
}
