"use client";

import { CLOSET_TYPES, ClosetTypeSelectorProps } from "../types/closet.types";
import { useClosetTypeIcon } from "../hooks/useClosetTypeIcon";

export default function ClosetTypeSelector({
  value,
  onChange,
  error,
}: ClosetTypeSelectorProps) {
  const { getIcon } = useClosetTypeIcon();

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-gray">
        Select Closet Type
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {CLOSET_TYPES.map((type) => {
          const isSelected = value === type.id;
          return (
            <button
              type="button"
              key={type.id}
              onClick={() => onChange(type.id)}
              className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                isSelected
                  ? "bg-pale-sage/35 border-forest ring-1 ring-forest shadow-xs"
                  : "bg-surface border-warm-gray hover:bg-cream hover:border-sage/50"
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 ${
                  isSelected
                    ? "bg-forest text-white"
                    : "bg-cream text-charcoal border border-warm-gray"
                }`}
              >
                {getIcon(type.id)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-sm font-semibold text-charcoal block">
                    {type.title}
                  </span>
                  <span className="text-xs font-medium text-forest px-1.5 py-0.5 rounded-md bg-pale-sage border border-warm-gray/60">
                    Max {type.defaultMaxSize}
                  </span>
                </div>
                <span className="text-xs text-muted-gray mt-0.5 line-clamp-2 block leading-relaxed">
                  {type.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      {error && <span className="text-xs text-rose-600">{error}</span>}
    </div>
  );
}
