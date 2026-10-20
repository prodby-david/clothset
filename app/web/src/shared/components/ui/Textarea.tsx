import React from "react";
import { TextareaProps } from "@/shared/types/ui.types";

export default function Textarea({
  label,
  error,
  helperText,
  className = "",
  id,
  rows = 3,
  ref,
  ...props
}: TextareaProps & { ref?: React.Ref<HTMLTextAreaElement> }) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-xs font-semibold uppercase tracking-wider text-muted-gray"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        ref={ref}
        rows={rows}
        className={`w-full p-3 bg-surface border rounded-xl text-sm text-charcoal placeholder:text-muted-gray/60 transition-colors focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent disabled:bg-cream disabled:cursor-not-allowed resize-none shadow-xs ${
          error ? "border-rose-400 focus:ring-rose-400" : "border-warm-gray"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-rose-600 font-medium">{error}</span>}
      {!error && helperText && (
        <span className="text-xs text-muted-gray">{helperText}</span>
      )}
    </div>
  );
}
