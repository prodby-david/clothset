import React from "react";
import { ChevronDown } from "lucide-react";
import { SelectProps } from "@/shared/types/ui.types";

export default function Select({
  label,
  error,
  options,
  className = "",
  id,
  ref,
  ...props
}: SelectProps & { ref?: React.Ref<HTMLSelectElement> }) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-semibold uppercase tracking-wider text-muted-gray"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          ref={ref}
          className={`w-full h-11 px-3.5 bg-surface dark:bg-[#18201a] border rounded-xl text-sm text-charcoal appearance-none pr-10 transition-colors focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent disabled:bg-cream disabled:cursor-not-allowed cursor-pointer shadow-xs ${
            error ? "border-rose-400 focus:ring-rose-400" : "border-warm-gray"
          } ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-muted-gray">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error && <span className="text-xs text-rose-600 font-medium">{error}</span>}
    </div>
  );
}
